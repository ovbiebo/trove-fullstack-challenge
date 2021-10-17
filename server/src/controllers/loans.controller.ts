import express from 'express';

import {LoansService} from "../services/loans.service";

import debug from 'debug';
import {singleton} from 'tsyringe';

const log: debug.IDebugger = debug('app:loans-controller');

@singleton()
export class LoansController {
    constructor(private loansService: LoansService) {
    }

    getLoansByApplicantId = async (req: express.Request, res: express.Response) => {
        const loans = await this.loansService.getLoansByApplicantId(req.params.userId);
        res.status(200).send(loans);
    }

    getLoanById = async (req: express.Request, res: express.Response) => {
        const loan = await this.loansService.readById(req.params.loanId);
        res.status(200).send(loan);
    }

    createLoan = async (req: express.Request, res: express.Response) => {
        req.body.status = 0;
        req.body.applicantId = req.params.userId;
        const loanId = await this.loansService.create(req.body);
        res.status(201).send({id: loanId});
    }
}
