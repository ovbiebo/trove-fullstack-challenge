import "reflect-metadata";

import {container} from "tsyringe";
import express from "express";

export function configureDependencies(app: express.Application) {
    container.register<express.Application>("app", {useValue: app});
}
