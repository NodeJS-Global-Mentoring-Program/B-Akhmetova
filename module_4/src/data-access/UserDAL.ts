import express from 'express';

import { User } from '../models/user';
import { UserGroup } from '../models/userGroup';
import { IUser } from '../interfaces/user';
import { IUserGroup } from '../interfaces/userGroup';
import { handleQuery } from '../utils/error';


export default class UserDAL {
    GetAllUsers(next: express.NextFunction): Promise<IUser[]|  void>  {
        return handleQuery(User.findAll(), next);
    }

    GetUserById(id: string, next: express.NextFunction): Promise<IUser| null |void>  {
        return handleQuery(User.findByPk(id), next);
    }

    CreateUser(userDTO: IUser, next: express.NextFunction): Promise<IUser |void> {
        return handleQuery(User.create(userDTO), next);
    }

    UpdateUser(userData: IUser, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(User.update(userData, { where: { id } }), next);
    }

    DeleteUser(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(User.destroy({ where: { id } }), next);
    }

    AddUsersToGroup(UserId: string, GroupId: string, transaction: any, next: express.NextFunction): Promise<IUserGroup |void> {
        return handleQuery(UserGroup.create({ UserId, GroupId }, transaction), next);
    }
}
