import express from 'express';

import { IUser } from '../interfaces/user';
import { handleQuery } from '../utils/error';

import db from '../models';

import sequelize from '../db/connnection';


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

    async AddUsersToGroup(userId: string, groupId: string, next: express.NextFunction): Promise<any |void> {
        try {
            await sequelize.transaction(async (t) => {
                const relation =   await db.UserGroup.create({
                    UserId: userId,
                    GroupId: groupId
                }, { transaction: t });

                return relation;
            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
}
