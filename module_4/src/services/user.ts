import UserDAL from '../data-access/UserDAL';

import { User } from '../types/user';

import { getAutoSuggest, createNewUser } from '../helpers';

export default class UserService {
    userDAL:UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    getAllUsers(): Promise<User[] | void> {
        return this.userDAL.getAllUsers();
    }

    getUserById(id: string): Promise<User| null | void> {
        return this.userDAL.getUserById(id);
    }

    async getAutoSuggestUsers(limit: number, loginSubstring:string):Promise<User[] |void>  {
        const allUsers = await this.userDAL.getAllUsers();
        return getAutoSuggest(loginSubstring, limit, allUsers);
    }

    createUser(user: User): Promise<User |void> {
        return this.userDAL.createUser(createNewUser(user));
    }

    updateUser(user: User, id: string): Promise<any> {
        return this.userDAL.updateUser(user, id);
    }

    deleteUser(id: string):  Promise<number | void> {
        return this.userDAL.deleteUser(id);
    }

    addUsersToGroup(userId: string, groupId: string): Promise<any |void> {
        return this.userDAL.addUsersToGroup(userId, groupId);
    }
}
