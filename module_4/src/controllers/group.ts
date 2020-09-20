import express from 'express';

import { middlewareValidatorGroup } from '../validation/group/middlewares';

import GroupService from '../services/group';

import GroupDAL from '../data-access/GroupDAL';

import { customLogger } from '../utils/logger';

const routerGroup = express.Router();

const groupDAL = new GroupDAL();
const groupService = new GroupService(groupDAL);

routerGroup.get('/', customLogger, async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.getAllGroups();
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});


routerGroup.get('/:id', customLogger, async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.getGroupById(req.params.id);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.put('/:id', customLogger, middlewareValidatorGroup, async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.updateGroup(req.body, req.params.id);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.delete('/:id', customLogger, async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.deleteGroup(req.params.id);
        res.send(`Deleted with code ${result}`);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.post('/', customLogger, middlewareValidatorGroup, async  (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.createGroup(req.body);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});


export default routerGroup;
