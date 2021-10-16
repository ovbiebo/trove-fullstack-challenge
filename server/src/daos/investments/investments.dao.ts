import {InvestmentDto} from "../../dtos/investments/investment.dto";

export interface InvestmentsDao {
    getInvestments: () => Promise<InvestmentDto[]>;
}
