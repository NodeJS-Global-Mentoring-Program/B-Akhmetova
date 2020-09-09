import express from 'express';

import { IUser } from '../interfaces/user';
import { handleQuery } from '../utils/error';

import db from '../models';


export default class UserDAL {
    GetAllUsers(next: express.NextFunction): Promise<IUser[]|  void>  {
        return handleQuery(db.User.findAll(), next);
    }

    GetUserById(id: string, next: express.NextFunction): Promise<IUser| null |void>  {
        return handleQuery(db.User.findByPk(id), next);
    }

    CreateUser(userDTO: IUser, next: express.NextFunction): Promise<IUser |void> {
        return handleQuery(db.User.create(userDTO), next);
    }

    UpdateUser(userData: IUser, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(db.User.update(userData, { where: { id } }), next);
    }

    DeleteUser(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(db.User.destroy({ where: { id } }), next);
    }

    AddUsersToGroup(userId: string, groupId: string, transaction: any, next: express.NextFunction): Promise<any |void> {
        return handleQuery(db.User.create({ userId, groupId }, transaction), next);
    }
}
