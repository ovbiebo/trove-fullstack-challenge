import {CreateUserDto} from '../../dtos/users/create.user.dto';
import {PatchUserDto} from '../../dtos/users/patch.user.dto';
import {PutUserDto} from '../../dtos/users/put.user.dto';
import {UsersDao} from "./users.dao";
import mongooseService from '../../services/mongoose.service';

import shortid from 'shortid';
import debug from 'debug';
import {singleton} from 'tsyringe';

const log: debug.IDebugger = debug('app:mongo-db-dao');

@singleton()
export class UsersDaoImpl implements UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: { type: String, select: false },
        firstName: String,
        lastName: String,
    }, { id: false });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UsersDaoImpl');
    }

    async addUser(userFields: CreateUserDto) {
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
        });
        await user.save();
        return userId;
    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).exec();
    }

    async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ) {
        return await this.User.findOneAndUpdate(
            {_id: userId},
            {$set: userFields},
            {new: true}
        ).exec();
    }

    async putUserById(userId: string, userFields: PutUserDto) {
        return this.updateUserById(userId, userFields);
    }

    async patchUserById(userId: string, userFields: PatchUserDto) {
        return this.updateUserById(userId, userFields);
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ email: email }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email +password')
            .exec();
    }
}
