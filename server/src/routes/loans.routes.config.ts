import {CommonRoutesConfig} from "./common.routes.config";
import {inject, injectable} from "tsyringe";
import {APP} from "../config/constants";
import express from "express";
import {LoansController} from "../controllers/loans.controller";

import {BodyValidationMiddleware} from "../middleware/common/body.validation.middleware";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {body} from "express-validator";
import {LoansMiddleware} from "../middleware/loans/loans.middleware";

@injectable()
export class LoansRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private loansController: LoansController,
        private loansMiddleware: LoansMiddleware,
        private bodyValidationMiddleware: BodyValidationMiddleware,
        private jwtMiddleware: JwtMiddleware
    ) {
        super(app, 'LoansRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/loans/:userId')
            .all(
                this.jwtMiddleware.validJWTNeeded
            )
            .get(this.loansController.getLoansByApplicantId)
            .post(
                body('amount').isFloat(),
                body('duration').isIn([0, 1]),
                this.bodyValidationMiddleware.verifyBodyFieldsErrors,
                this.loansMiddleware.validateUserHasNoActiveLoan,
                this.loansMiddleware.validateLoanIsUnderSixtyPercent,
                this.loansController.createLoan
            );

        this.app
            .route('/loans/:userId/:loanId')
            .all(
                this.jwtMiddleware.validJWTNeeded
            )
            .get(this.loansController.getLoanById)

        return this.app;
    }
}
