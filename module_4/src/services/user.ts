import UserDAL from '../data-access/UserDAL';

import { User } from '../types/user';
import { UserGroup } from '../types/userGroup';

import { getAutoSuggest, createNewUser } from '../helpers';

export default class UserService {
    private userDAL:UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    getAllUsers(): Promise<User[]> {
        return this.userDAL.getAllUsers();
    }

    getUserById(id: string): Promise<User| null> {
        return this.userDAL.getUserById(id);
    }

    async getAutoSuggestUsers(limit: number, loginSubstring:string):Promise<User[]>  {
        const allUsers = await this.userDAL.getAllUsers();
        return getAutoSuggest(loginSubstring, limit, allUsers);
    }

    createUser(user: User): Promise<User> {
        return this.userDAL.createUser(createNewUser(user));
    }

    updateUser(user: User, id: string): Promise<User[]|number> {
        return this.userDAL.updateUser(user, id);
    }

    deleteUser(id: string):  Promise<number> {
        return this.userDAL.deleteUser(id);
    }

    addUsersToGroup(userIds: Array<string>, groupId: string): Promise<UserGroup|void> {
        return this.userDAL.addUsersToGroup(userIds, groupId);
    }
}
