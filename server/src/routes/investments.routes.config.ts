import {inject, injectable} from "tsyringe";
import {CommonRoutesConfig} from "./common.routes.config";
import express from "express";
import {APP} from "../config/constants";
import {InvestmentsController} from "../controllers/investments.controller";
import {UsersMiddleware} from "../middleware/users/users.middleware";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {PermissionMiddleware} from "../middleware/auth/permission.middleware";

@injectable()
export class InvestmentsRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private investmentsController: InvestmentsController,
        private usersMiddleware: UsersMiddleware,
        private jwtMiddleware: JwtMiddleware,
        private permissionMiddleware: PermissionMiddleware
    ) {
        super(app, "InvestmentsRoutes");
    }

    configureRoutes(): express.Application {
        this.app
            .route('/investments/:userId')
            .all(
                this.usersMiddleware.validateUserExists,
                this.jwtMiddleware.validJWTNeeded,
                this.permissionMiddleware.onlySameUserCanDoThisAction
            )
            .get(this.investmentsController.listInvestments)

        return this.app;
    }
}
