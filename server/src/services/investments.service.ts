import {inject, singleton} from "tsyringe";
import {INVESTMENTS_DAO} from "../config/constants";
import {InvestmentsDao} from "../daos/investments/investments.dao";

@singleton()
export class InvestmentsService {
    constructor(@inject(INVESTMENTS_DAO) private investmentsDao: InvestmentsDao) {
    }

    async list() {
        return this.investmentsDao.getInvestments();
    }
}
