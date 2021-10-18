import express from 'express';
import {LoansService} from '../../services/loans.service';
import {InvestmentsService} from "../../services/investments.service";
import debug from 'debug';
import {singleton} from 'tsyringe';

const log: debug.IDebugger = debug('app:loans-middleware');

@singleton()
export class LoansMiddleware {
    constructor(
        private loansService: LoansService,
        private investmentsService: InvestmentsService
    ) {
    }

    validateUserHasNoActiveLoan = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const loan = await this.loansService.getActiveLoanByApplicantId(res.locals.jwt.userId);
        log(loan);
        if (loan) {
            res.status(400).send({error: `Can't take a new loan while another is active`});
        } else {
            next();
        }
    }

    validateLoanIsUnderSixtyPercent = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const investments = await this.investmentsService.list();
        let portfolioValue = 0.0;
        investments.forEach((investment) => portfolioValue += investment.equityValue);
        if (req.body.amount <= 0.6 * portfolioValue) {
            next();
        } else {
            res.status(400).send({error: `Can't take loan higher than 60% of portfolio value`});
        }
    }
}
