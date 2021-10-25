import {CreatePaymentDto} from '../dtos/payments/create.payment.dto';
import {PaymentsDao} from "../daos/payments/payments.dao";

import {inject, singleton} from 'tsyringe';
import {PAYMENTS_DAO} from "../config/constants";

@singleton()
export class PaymentsService {
    constructor(@inject(PAYMENTS_DAO) private paymentsDao: PaymentsDao) {
    }

    async create(id: string, resource: CreatePaymentDto) {
        return this.paymentsDao.createPayment(id, resource);
    }
}
