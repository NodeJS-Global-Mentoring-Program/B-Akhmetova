import express from 'express';

import UserDAL from '../data-access/UserDAL';

import { IUser } from '../interfaces/user';
import { IUserGroup } from '../interfaces/userGroup';

import { getAutoSuggest, createNewUser } from '../helpers';
import { handleQuery } from '../utils/error';

export default class UserService {
    userDAL:UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    GetAllUsers(next: express.NextFunction): Promise<IUser[] | void> {
        return handleQuery(this.userDAL.GetAllUsers(next), next);
    }

    GetUserById(id: string, next: express.NextFunction): Promise<IUser| null | void> {
        return handleQuery(this.userDAL.GetUserById(id, next), next);
    }

    async GetAutoSuggestUsers(limit: number, loginSubstring:string, next: express.NextFunction):Promise<IUser[] |void>  {
        const allUsers = handleQuery(this.userDAL.GetAllUsers(next) || [], next);
        return getAutoSuggest(loginSubstring, limit, await allUsers);
    }

    CreateUser(user: IUser, next: express.NextFunction): Promise<IUser |void> {
        return handleQuery(this.userDAL.CreateUser(createNewUser(user), next), next);
    }

    UpdateUser(user: IUser, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(this.userDAL.UpdateUser(user, id, next), next);
    }

    DeleteUser(id: string, next: express.NextFunction):  Promise<number | void> {
        return handleQuery(this.userDAL.DeleteUser(id, next), next);
    }

    AddUsersToGroup(userId: string, groupId: string, transaction: any, next: express.NextFunction): Promise<IUserGroup |void> {
        return handleQuery(this.userDAL.AddUsersToGroup(userId, groupId, transaction, next), next);
    }
}
