import {CommonRoutesConfig} from "./common.routes.config";
import express from "express";
import {inject, injectable} from "tsyringe";
import {APP} from "../config/constants";
import {PaymentsController} from "../controllers/payments.controller";
import {BodyValidationMiddleware} from "../middleware/common/body.validation.middleware";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {PaymentsMiddleware} from "../middleware/payments/payments.middleware";

@injectable()
export class PaymentsRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private paymentsController: PaymentsController,
        private bodyValidationMiddleware: BodyValidationMiddleware,
        private jwtMiddleware: JwtMiddleware,
        private paymentsMiddleware: PaymentsMiddleware
    ) {
        super(app, "PaymentsRoutes");
    }

    configureRoutes(): express.Application {
        this.app.route("/payments/:userId/:loanId")
            .all(
                this.jwtMiddleware.validJWTNeeded,
            )
            .get(
                this.paymentsMiddleware.extractUserEmail,
                this.paymentsMiddleware.extractDueAmount,
                this.paymentsController.createPayment
            )

        return this.app;
    }
}
