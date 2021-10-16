import debug from "debug";
import {singleton} from 'tsyringe';
import {InvestmentDto} from "../../dtos/investments/investment.dto";
import {InvestmentsDao} from "./investments.dao";

const log: debug.IDebugger = debug('app:investments-dao');

@singleton()
export class InvestmentsDaoImpl implements InvestmentsDao {
    investments: Array<InvestmentDto> = [
        {
            "symbol": "AAPL",
            "totalQuantity": 20,
            "equityValue": 2500.0,
            "pricePerShare": 125.0
        }, {
            "symbol": "TSLA",
            "totalQuantity": 5.0,
            "equityValue": 3000.0,
            "pricePerShare": 600.0
        }, {
            "symbol": "AMZN",
            "totalQuantity": 1.38461538,
            "equityValue": 4500.0,
            "pricePerShare": 150.0
        }
    ]

    async getInvestments() {
        return this.investments;
    }
}
