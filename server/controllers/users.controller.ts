import express from 'express';

import {UsersService} from '../services/users.service';

import argon2 from 'argon2';

import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

import {singleton} from 'tsyringe';

@singleton()
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    getUserById = async (req: express.Request, res: express.Response) => {
        const user = await this.usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    createUser = async (req: express.Request, res: express.Response) => {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await this.usersService.create(req.body);
        res.status(201).send({id: userId});
    }

    patch = async (req: express.Request, res: express.Response) => {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await this.usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    put = async (req: express.Request, res: express.Response) => {
        req.body.password = await argon2.hash(req.body.password);
        log(await this.usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    removeUser = async (req: express.Request, res: express.Response) => {
        log(await this.usersService.deleteById(req.body.id));
        res.status(204).send();
    }
}
