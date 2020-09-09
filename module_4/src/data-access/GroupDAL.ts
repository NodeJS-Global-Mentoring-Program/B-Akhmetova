import express from 'express';

import { IGroup } from '../interfaces/group';

import { handleQuery } from '../utils/error';

import db from '../models';

export default class GroupDAL {
    GetAllGroups(next: express.NextFunction): Promise<IGroup[]|  void>  {
        return handleQuery(db.Group.findAll(), next);
    }

    GetGroupById(id: string, next: express.NextFunction): Promise<IGroup| null |void>  {
        return handleQuery(db.Group.findByPk(id), next);
    }

    CreateGroup(groupDTO: IGroup, next: express.NextFunction): Promise<IGroup |void> {
        return handleQuery(db.Group.create(groupDTO), next);
    }

    UpdateGroup(userData: IGroup, id: string, next: express.NextFunction): Promise<any> {
        return handleQuery(db.Group.update(userData, { where: { id } }), next);
    }

    DeleteGroup(id: string, next: express.NextFunction): Promise<number | void> {
        return handleQuery(db.Group.destroy({ where: { id } }), next);
    }
}
