import shortid from 'shortid';
import debug from 'debug';
import {singleton} from 'tsyringe';
import {Loan} from "../../models/loan.model";
import {PaymentsDao} from "./payments.dao";
import {CreatePaymentDto} from '../../dtos/payments/create.payment.dto';
import axios from "axios";
import {Duration} from "../../middleware/loans/duration.enum";
import {Status} from "../../middleware/loans/status.enum";

const log: debug.IDebugger = debug('app:payments-mongo-db-dao');

@singleton()
export class PaymentsDaoImpl implements PaymentsDao {
    axiosInstance = axios.create({baseURL: "https://api.paystack.co/transaction"})

    constructor() {
        log('Created new instance of PaymentsDaoImpl');
        this.axiosInstance.interceptors.request.use(function (config) {
            config.headers!.Authorization = `Bearer ${process.env.PAYSTACK_SECRET}`;
            config.headers!['Content-Type'] = `application/json`;
            return config;
        });
    }

    async createPayment(loanId: string, paymentFields: CreatePaymentDto) {
        const loan = await Loan.findOne({_id: loanId});

        paymentFields.amount = Math.round(paymentFields.amount * 100);
        log('amount: %O', paymentFields.amount);
        const response = await
            this.axiosInstance
                .post<string, any>(
                    "/initialize",
                    {
                        ...paymentFields,
                        currency: 'NGN',
                        callback_url: `${process.env.CLIENT_URL}/loans`,
                    }
                )

        const invoice = response.data
        log('reference: %O', invoice)

        const paymentId = shortid.generate();
        loan.payments.push({
            _id: paymentId,
            reference: invoice.data.reference,
            ...paymentFields,
        });
        const duration = loan.duration === Duration.SIX_MONTHS ? 6 : 12;
        if (loan.payments.length === duration){
            loan.status = Status.CLOSED;
        }
        await loan.save();

        return invoice.data.authorization_url;
    }
}
