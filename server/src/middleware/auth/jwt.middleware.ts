import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {Jwt} from '../../types/jwt';
import {UsersService} from '../../services/users.service';
import {singleton} from "tsyringe";
import debug from "debug";

const log: debug.IDebugger = debug('app:jwt-middleware');

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

@singleton()
export class JwtMiddleware {
    constructor(private usersService: UsersService) {
    }

    verifyRefreshBodyField = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res
                .status(400)
                .send({errors: ['Missing required field: refreshToken']});
        }
    }

    validRefreshNeeded = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const authorization = req.headers['authorization']!.split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                res.locals.jwt = jwt.decode(authorization[1])
            }
        } catch (e) {

        }

        const user: any = await this.usersService.getUserByEmailWithPassword(
            res.locals.jwt.email
        );
        const salt = crypto.createSecretKey(
            Buffer.from(res.locals.jwt.refreshKey.data)
        );
        const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.userId + jwtSecret)
            .digest('base64');
        if (hash === req.body.refreshToken) {
            req.body = {
                userId: user._id,
                email: user.email,
            };
            return next();
        } else {
            return res.status(400).send({errors: ['Invalid refresh token']});
        }
    }

    validJWTNeeded = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    res.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtSecret
                    ) as Jwt;
                    next();
                }
            } catch (err) {
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
}
