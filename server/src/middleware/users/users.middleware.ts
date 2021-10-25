import express from 'express';
import {UsersService} from '../../services/users.service';
import debug from 'debug';
import {singleton} from 'tsyringe';
import * as argon2 from "argon2";

const log: debug.IDebugger = debug('app:users-middleware');

@singleton()
export class UsersMiddleware {
    constructor(private usersService: UsersService) {
    }

    validateSameEmailDoesntExist = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = await this.usersService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }

    validateSameEmailBelongToSameUser = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (res.locals.user._id === req.params.userId) {
            next();
        } else {
            res.status(400).send({error: `Invalid email`});
        }
    }

    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            await this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    validatePatchPassword = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user: any = await this.usersService.getUserByEmailWithPassword(
            req.body.email
        );
        if (user) {
            const passwordHash = user.password;
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body.password = req.body.newPassword;
                return next();
            }
        }

        res.status(400).send({errors: ['Invalid credentials']});
    };

    validateUserExists = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = await this.usersService.readById(req.params.userId);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                error: `User ${req.params.userId} not found`,
            });
        }
    }

    extractUserId = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        req.body.id = req.params.userId;
        next();
    }
}
