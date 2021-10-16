import {CreateUserDto} from '../dtos/users/create.user.dto';
import {PutUserDto} from '../dtos/users/put.user.dto';
import {PatchUserDto} from '../dtos/users/patch.user.dto';
import {UsersDao} from "../daos/users/users.dao";

import {inject, singleton} from 'tsyringe';
import {USERS_DAO} from "../config/constants";

@singleton()
export class UsersService {
    constructor(@inject(USERS_DAO) private usersDao: UsersDao) {
    }

    async create(resource: CreateUserDto) {
        return this.usersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return this.usersDao.removeUserById(id);
    }

    async patchById(id: string, resource: PatchUserDto) {
        return this.usersDao.patchUserById(id, resource);
    }

    async readById(id: string) {
        return this.usersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDto) {
        return this.usersDao.putUserById(id, resource);
    }

    async getUserByEmail(email: string) {
        return this.usersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return this.usersDao.getUserByEmailWithPassword(email);
    }
}
