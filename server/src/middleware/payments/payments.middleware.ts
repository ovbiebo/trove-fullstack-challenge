import express from 'express';
import debug from 'debug';
import {singleton} from 'tsyringe';
import {UsersService} from "../../services/users.service";
import {LoansService} from "../../services/loans.service";
import {Duration} from "../loans/duration.enum";

const log: debug.IDebugger = debug('app:loans-middleware');

@singleton()
export class PaymentsMiddleware {
    constructor(
        private usersService: UsersService, private loansService: LoansService
    ) {
    }

    extractUserEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const userDetails = await this.usersService.readById(req.params.userId);
        if (userDetails) {
            req.body.email = userDetails.email;
            next();
        } else {
            res.status(400).send({error: `Can't identify user`});
        }
    }

    extractDueAmount = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const loanDetails = await this.loansService.readById(req.params.loanId);
        if (loanDetails) {
            const duration = loanDetails.duration === Duration.SIX_MONTHS ? 6 : 12;
            req.body.amount = loanDetails.amount / duration;
            next();
        } else {
            res.status(400).send({error: `Can't identify user`});
        }
    }
}
