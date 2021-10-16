import express from 'express';
import debug from 'debug';
import {singleton} from "tsyringe";

const log: debug.IDebugger = debug('app:common-permission-middleware');

@singleton()
export class PermissionMiddleware {
    async onlySameUserCanDoThisAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            req.params &&
            req.params.userId &&
            req.params.userId === res.locals.jwt.userId
        ) {
            return next();
        } else {
            return res.status(403).send();
        }
    }
}
