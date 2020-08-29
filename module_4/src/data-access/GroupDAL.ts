import express from 'express';

import { Group } from '../models/group';
import { IGroup } from '../interfaces/group';
import { handleQuery } from '../utils/error';

export default class GroupDAL {
    GetAllGroups(next: express.NextFunction): Promise<IGroup[]|  void>  {
        return handleQuery(Group.findAll(), next);
    }

    GetGroupById(id: string, next: express.NextFunction): Promise<IGroup| null |void>  {
        return handleQuery(Group.findByPk(id), next);
    }

    CreateGroup(groupDTO: IGroup, next: express.NextFunction): Promise<IGroup |void> {
        return handleQuery(Group.create(groupDTO), next);
    }

    UpdateGroup(userData: IGroup, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(Group.update(userData, { where: { id } }), next);
    }

    DeleteGroup(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(Group.destroy({ where: { id } }), next);
    }
}
