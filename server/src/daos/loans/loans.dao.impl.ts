import {LoansDao} from "./loans.dao";
import {CreateLoanDto} from "../../dtos/loans/create.loan.dto";

import shortid from 'shortid';
import debug from 'debug';
import {singleton} from 'tsyringe';
import {Loan} from "../../models/loan.model";
import {Status} from "../../middleware/loans/status.enum";

const log: debug.IDebugger = debug('app:loans-mongo-db-dao');

@singleton()
export class LoansDaoImpl implements LoansDao {
    constructor() {
        log('Created new instance of LoansDaoImpl');
    }

    async addLoan(loanFields: CreateLoanDto) {
        const loanId = shortid.generate();
        const loan = new Loan({
            _id: loanId,
            ...loanFields,
        });
        await loan.save();
        return loanId;
    }

    async getLoansByApplicantId(applicantId: string) {
        return Loan.find({applicantId: applicantId})
            .exec();
    }

    async getActiveLoanByApplicantId(applicantId: string) {
        return Loan.findOne({applicantId: applicantId, status: Status.ACTIVE})
            .exec();
    }

    async getLoanById(loanId: string) {
        return Loan.findOne({_id: loanId}).exec();
    }
}
