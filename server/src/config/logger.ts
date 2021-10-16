import express from "express";
import * as expressWinston from "express-winston";
import * as winston from "winston";

export function configureLogger(app: express.Application){
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({all: true})
        ),
    }

    if (!process.env.DEBUG) {
        loggerOptions.meta = false;
    }

    app.use(expressWinston.logger(loggerOptions));
}
