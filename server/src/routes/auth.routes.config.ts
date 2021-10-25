import {CommonRoutesConfig} from "./common.routes.config";
import {inject, singleton} from "tsyringe";
import express from "express";
import {APP} from "../config/constants";
import {AuthController} from "../controllers/auth.controller";
import {AuthMiddleware} from "../middleware/auth/auth.middleware";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {BodyValidationMiddleware} from "../middleware/common/body.validation.middleware";
import {body} from "express-validator";

@singleton()
export class AuthRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private authController: AuthController,
        private authMiddleware: AuthMiddleware,
        private jwtMiddleware: JwtMiddleware,
        private bodyValidationMiddleware: BodyValidationMiddleware,
    ) {
        super(app, "AuthRoutes");
    }

    configureRoutes(): express.Application {
        this.app.post(`/auth`, [
            body('email').isEmail(),
            body('password').isString(),
            this.bodyValidationMiddleware.verifyBodyFieldsErrors,
            this.authMiddleware.verifyUserPassword,
            this.authController.createJWT,
        ]);

        this.app.post(`/auth/token`, [
            this.jwtMiddleware.verifyRefreshBodyField,
            this.jwtMiddleware.validRefreshNeeded,
            this.authController.createJWT,
        ]);

        return this.app;
    }
}
