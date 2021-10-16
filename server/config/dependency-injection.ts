import "reflect-metadata";

import {container} from "tsyringe";
import express from "express";
import {APP, USERS_DAO} from "./constants";
import {UsersDao} from "../daos/users/users.dao";
import {UsersDaoImpl} from "../daos/users/users.dao.impl";

export function configureDependencies(app: express.Application) {
    container.register<express.Application>(APP, {useValue: app});
    container.register<UsersDao>(USERS_DAO, {useClass: UsersDaoImpl});
}
