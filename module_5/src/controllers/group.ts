import express from 'express';

import { middlewareValidatorGroup } from '../validation/group/middlewares';

import GroupService from '../services/group';

import GroupDAL from '../data-access/GroupDAL';

import { customLogger } from '../logger/customLogger';

const routerGroup = express.Router();

const groupDAL = new GroupDAL();
const groupService = new GroupService(groupDAL);

routerGroup.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.getAllGroups();
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);


routerGroup.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.getGroupById(req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerGroup.put('/:id', middlewareValidatorGroup, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.updateGroup(req.body, req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerGroup.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.deleteGroup(req.params.id);
        res.send(`Deleted with code ${result}`);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerGroup.post('/', middlewareValidatorGroup, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await groupService.createGroup(req.body);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);


export default routerGroup;
