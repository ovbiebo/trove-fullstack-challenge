import {CommonRoutesConfig} from "./common.routes.config";
import {inject, injectable} from "tsyringe";
import {APP} from "../config/constants";
import express from "express";
import {LoansController} from "../controllers/loans.controller";

import {BodyValidationMiddleware} from "../middleware/common/body.validation.middleware";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {PermissionMiddleware} from "../middleware/auth/permission.middleware";
import {body} from "express-validator";

@injectable()
export class LoansRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private loansController: LoansController,
        private bodyValidationMiddleware: BodyValidationMiddleware,
        private jwtMiddleware: JwtMiddleware,
        private permissionMiddleware: PermissionMiddleware
    ) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/loans/:userId')
            .all(
                this.jwtMiddleware.validJWTNeeded,
                this.permissionMiddleware.onlySameUserCanDoThisAction
            )
            .get(this.loansController.getLoansByApplicantId)
            .post(
                body('amount').isFloat(),
                body('duration').isIn([0, 1]),
                this.bodyValidationMiddleware.verifyBodyFieldsErrors,
                this.loansController.createLoan
            );

        this.app
            .route('/loans/:userId/:loanId')
            .all(
                this.jwtMiddleware.validJWTNeeded,
                this.permissionMiddleware.onlySameUserCanDoThisAction
            )
            .get(this.loansController.getLoanById)

        return this.app;
    }
}
