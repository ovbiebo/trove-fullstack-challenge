import express from 'express';
import {UsersService} from '../../services/users.service';
import * as argon2 from 'argon2';
import {singleton} from "tsyringe";

@singleton()
export class AuthMiddleware {
    constructor(private usersService: UsersService) {
    }

    verifyUserPassword = async (
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
                req.body = {
                    userId: user._id,
                    email: user.email,
                };
                return next();
            }
        }

        res.status(400).send({errors: ['Invalid email and/or password']});
    }
}
