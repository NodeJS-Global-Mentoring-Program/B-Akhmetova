import express from 'express';

import UserGroupDAL from '../data-access/UserGroupDAL';

import { IUserGroup } from '../interfaces/userGroup';

import { handleQuery } from '../utils/error';

export default class UserGroupService {
    userGroupDAL:UserGroupDAL;

    constructor(userGroupDAL: UserGroupDAL) {
        this.userGroupDAL = userGroupDAL;
    }

    GetAllRelations(next: express.NextFunction): Promise<IUserGroup[]|  void>  {
        return handleQuery(this.userGroupDAL.GetAllRelations(next), next);
    }

    DeleteRecordsWithUserId(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(this.userGroupDAL.DeleteRecordsWithUserId(id, next), next);
    }

    DeleteRecordsWithGroupId(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(this.userGroupDAL.DeleteRecordsWithGroupId(id, next), next);
    }

    AddUsersToGroup(userId: string, groupId: string, transaction: any, next: express.NextFunction): Promise<IUserGroup |void> {
        return handleQuery(this.userGroupDAL.AddUsersToGroup(userId, groupId, transaction, next), next);
    }
}
