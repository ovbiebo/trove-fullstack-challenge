import debug from "debug";

const log: debug.IDebugger = debug('app:investments-controller');
import {singleton} from 'tsyringe';
import {InvestmentsService} from "../services/investments.service";
import express from "express";

@singleton()
export class InvestmentsController{
    constructor(private investmentsService: InvestmentsService) {
    }

    listInvestments = async (req: express.Request, res: express.Response) => {
        const investments = await this.investmentsService.list();
        res.status(200).send(investments);
    }
}
