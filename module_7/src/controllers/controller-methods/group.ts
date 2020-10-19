import express from 'express';

import GroupService from '../../services/group';
import GroupDAL from '../../data-access/GroupDAL';

const groupDAL = new GroupDAL();
const groupService = new GroupService(groupDAL);

export const getAllGroups = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.getAllGroups();
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const getGroupById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.getGroupById(req.params.id);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const createGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.createGroup(req.body);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const updateGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.updateGroup(req.body, req.params.id);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const deleteGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.deleteGroup(req.params.id);
        res.send(`Deleted with code ${result}`);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};
