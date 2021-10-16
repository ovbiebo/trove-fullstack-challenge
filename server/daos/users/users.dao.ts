import {CreateUserDto} from "../../dtos/users/create.user.dto";
import {PutUserDto} from "../../dtos/users/put.user.dto";
import {PatchUserDto} from "../../dtos/users/patch.user.dto";

export interface UsersDao{
    addUser: (userFields: CreateUserDto) => Promise<any>;
    getUserById: (userId: string) => Promise<CreateUserDto|undefined>;
    putUserById: (userId: string, user: PutUserDto) => Promise<any>;
    patchUserById: (userId: string, user: PatchUserDto) => Promise<any>;
    removeUserById: (userId: string) => Promise<any>;
    getUserByEmail: (email: string) => Promise<CreateUserDto|null>;
    getUserByEmailWithPassword: (email: string) => Promise<CreateUserDto|null>;
}
