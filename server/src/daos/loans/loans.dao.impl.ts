import {LoansDao} from "./loans.dao";
import {CreateLoanDto} from "../../dtos/loans/create.loan.dto";
import mongooseService from '../../services/mongoose.service';

import shortid from 'shortid';
import debug from 'debug';
import {singleton} from 'tsyringe';

const log: debug.IDebugger = debug('app:loans-mongo-db-dao');

@singleton()
export class LoansDaoImpl implements LoansDao {
    Schema = mongooseService.getMongoose().Schema;

    loanSchema = new this.Schema({
        _id: String,
        applicantId: String,
        duration: Number,
        amount: Number,
        status: Number
    }, {id: false});

    Loan = mongooseService.getMongoose().model('Loans', this.loanSchema);

    constructor() {
        log('Created new instance of LoansDaoImpl');
    }

    async addLoan(loanFields: CreateLoanDto) {
        const loanId = shortid.generate();
        const loan = new this.Loan({
            _id: loanId,
            ...loanFields,
        });
        await loan.save();
        return loanId;
    }

    async getLoansByApplicantId(applicantId: string) {
        return this.Loan.find({applicantId: applicantId})
            .exec();
    }

    async getLoanById(loanId: string) {
        return this.Loan.findOne({_id: loanId}).exec();
    }
}
