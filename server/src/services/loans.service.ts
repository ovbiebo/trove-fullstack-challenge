import {CreateLoanDto} from '../dtos/loans/create.loan.dto';
import {LoansDao} from "../daos/loans/loans.dao";

import {inject, singleton} from 'tsyringe';
import {LOANS_DAO} from "../config/constants";

@singleton()
export class LoansService {
    constructor(@inject(LOANS_DAO) private loansDao: LoansDao) {
    }

    async create(resource: CreateLoanDto) {
        return this.loansDao.addLoan(resource);
    }

    async readById(id: string) {
        return this.loansDao.getLoanById(id);
    }

    async getLoansByApplicantId(id: string) {
        return this.loansDao.getLoansByApplicantId(id);
    }
}
