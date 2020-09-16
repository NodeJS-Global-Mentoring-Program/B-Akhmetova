import express from 'express';

import { middlewareValidatorGroup } from '../validation/group/middlewares';

import GroupService from '../services/group';

import GroupDAL from '../data-access/GroupDAL';

const routerGroup = express.Router();

const groupDAL = new GroupDAL();
const groupService = new GroupService(groupDAL);

routerGroup.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.getAllGroups();
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});


routerGroup.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.getGroupById(req.params.id);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.put('/:id', middlewareValidatorGroup, async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.updateGroup(req.body, req.params.id);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.deleteGroup(req.params.id);
        res.send(`Deleted with code ${result}`);
    } catch (error) {
        console.log('[error]', error);
    }
});

routerGroup.post('/', middlewareValidatorGroup, async  (req: express.Request, res: express.Response) => {
    try {
        const result = await groupService.createGroup(req.body);
        res.send(result);
    } catch (error) {
        console.log('[error]', error);
    }
});


export default routerGroup;
