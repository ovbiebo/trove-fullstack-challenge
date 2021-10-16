import "reflect-metadata";

import {container} from "tsyringe";
import express from "express";
import {APP, INVESTMENTS_DAO, USERS_DAO} from "./constants";
import {UsersDao} from "../daos/users/users.dao";
import {UsersDaoImpl} from "../daos/users/users.dao.impl";
import {InvestmentsDaoImpl} from "../daos/investments/investments.dao.impl";
import {InvestmentsDao} from "../daos/investments/investments.dao";

export function configureDependencies(app: express.Application) {
    container.register<express.Application>(APP, {useValue: app});
    container.register<UsersDao>(USERS_DAO, {useClass: UsersDaoImpl});
    container.register<InvestmentsDao>(INVESTMENTS_DAO, {useClass: InvestmentsDaoImpl});
}
