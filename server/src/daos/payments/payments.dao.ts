import {CreatePaymentDto} from "../../dtos/payments/create.payment.dto";

export interface PaymentsDao {
    createPayment: (loanId: string, paymentFields: CreatePaymentDto) => Promise<any>;
}
