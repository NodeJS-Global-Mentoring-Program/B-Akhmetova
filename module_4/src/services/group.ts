import express from 'express';

import GroupDAL from '../data-access/GroupDAL';
import { IGroup } from '../interfaces/group';
import { createNewGroup } from '../helpers/group';
import { handleQuery } from '../utils/error';

export default class GroupService {
    groupDAL:GroupDAL;

    constructor(groupDAL: GroupDAL) {
        this.groupDAL = groupDAL;
    }

    GetAllGroups(next: express.NextFunction): Promise<IGroup[] | void> {
        return handleQuery(this.groupDAL.GetAllGroups(next), next);
    }

    GetGroupById(id: string, next: express.NextFunction): Promise<IGroup| null | void> {
        return handleQuery(this.groupDAL.GetGroupById(id, next), next);
    }

    CreateGroup(group: IGroup, next: express.NextFunction): Promise<IGroup |void> {
        return handleQuery(this.groupDAL.CreateGroup(createNewGroup(group), next), next);
    }

    UpdateGroup(group: IGroup, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(this.groupDAL.UpdateGroup(group, id, next), next);
    }

    DeleteGroup(id: string, next: express.NextFunction):  Promise<number | void> {
        return handleQuery(this.groupDAL.DeleteGroup(id, next), next);
    }
}
