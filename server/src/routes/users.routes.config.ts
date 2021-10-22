import {CommonRoutesConfig} from "./common.routes.config";
import {UsersController} from '../controllers/users.controller';
import {UsersMiddleware} from '../middleware/users/users.middleware';
import express from "express";

import {inject, injectable} from "tsyringe";
import {body} from "express-validator";
import {BodyValidationMiddleware} from "../middleware/common/body.validation.middleware";
import {APP} from "../config/constants";
import {JwtMiddleware} from "../middleware/auth/jwt.middleware";
import {PermissionMiddleware} from "../middleware/auth/permission.middleware";

@injectable()
export class UsersRoutes extends CommonRoutesConfig {
    constructor(
        @inject(APP) app: express.Application,
        private usersController: UsersController,
        private usersMiddleware: UsersMiddleware,
        private bodyValidationMiddleware: BodyValidationMiddleware,
        private jwtMiddleware: JwtMiddleware,
        private permissionMiddleware: PermissionMiddleware
    ) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/users')
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
                body('firstName').isString(),
                body('lastName').isString(),
                this.bodyValidationMiddleware.verifyBodyFieldsErrors,
                this.usersMiddleware.validateSameEmailDoesntExist,
                this.usersController.createUser
            );

        this.app.param(`userId`, this.usersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(
                this.usersMiddleware.validateUserExists,
                this.jwtMiddleware.validJWTNeeded,
                this.permissionMiddleware.onlySameUserCanDoThisAction
            )
            .get(this.usersController.getUserById)
            .delete(this.usersController.removeUser)

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({min: 6})
                .withMessage('Must include password (6+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            this.bodyValidationMiddleware.verifyBodyFieldsErrors,
            this.usersMiddleware.validateSameEmailBelongToSameUser,
            this.usersController.put,
        ])

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            this.bodyValidationMiddleware.verifyBodyFieldsErrors,
            this.usersMiddleware.validatePatchEmail,
            this.usersController.patch,
        ]);

        this.app.patch(`/users/:userId/password`, [
            this.usersMiddleware.validateUserExists,
            this.jwtMiddleware.validJWTNeeded,
            this.permissionMiddleware.onlySameUserCanDoThisAction,
            body('email').isEmail(),
            body('password').isString(),
            body('newPassword')
                .isLength({min: 6})
                .withMessage('Password must be 6+ characters'),
            this.bodyValidationMiddleware.verifyBodyFieldsErrors,
            this.usersMiddleware.validateSameEmailBelongToSameUser,
            this.usersMiddleware.validatePatchPassword,
            this.usersController.patch,
        ]);

        return this.app;
    }
}
