import express from 'express';

import { UserGroup } from '../models/userGroup';
import { IUserGroup } from '../interfaces/userGroup';
import { handleQuery } from '../utils/error';


export default class UserGroupDAL {
    GetAllRelations(next: express.NextFunction): Promise<IUserGroup[]|  void>  {
        return handleQuery(UserGroup.findAll(), next);
    }

    DeleteRecordsWithUserId(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(UserGroup.destroy({ where: { userId:id } }), next);
    }

    DeleteRecordsWithGroupId(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(UserGroup.destroy({ where: { groupId:id } }), next);
    }

    AddUsersToGroup(userId: string, groupId: string, transaction: any, next: express.NextFunction): Promise<IUserGroup |void> {
        return handleQuery(UserGroup.create({ userId, groupId }, transaction), next);
    }
}
