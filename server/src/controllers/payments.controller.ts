import express from 'express';

import {PaymentsService} from "../services/payments.service";

import debug from 'debug';
import {singleton} from 'tsyringe';

const log: debug.IDebugger = debug('app:payments-controller');

@singleton()
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {
    }

    createPayment = async (req: express.Request, res: express.Response) => {
        const paymentURL = await this.paymentsService.create(req.params.loanId, req.body);
        res.status(201).send({url: paymentURL});
    }
}
