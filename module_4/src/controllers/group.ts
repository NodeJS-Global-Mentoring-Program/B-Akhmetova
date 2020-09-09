import express from 'express';

import { middlewareValidatorGroup } from '../validation/group/middlewares';

import GroupService from '../services/group';

import GroupDAL from '../data-access/GroupDAL';

import { handleQuery } from '../utils/error';

const routerGroup = express.Router();

const groupDAL = new GroupDAL();
const groupService = new GroupService(groupDAL);

routerGroup.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await groupService.GetAllGroups(next);
    res.send(result);
});


routerGroup.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(groupService.GetGroupById(req.params.id, next), next);
    res.send(result);
});

routerGroup.put('/:id', middlewareValidatorGroup, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(groupService.UpdateGroup(req.body, req.params.id, next), next);
    res.send(result);
});

routerGroup.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const deletedNum = await handleQuery(groupService.DeleteGroup(req.params.id, next), next);
    if (deletedNum) {
        res.send(`User with id ${req.params.id} successfully deleted`);
    }
    res.send(`User with id ${req.params.id} isn't exist or has already deleted`);
});

routerGroup.post('/', middlewareValidatorGroup, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(groupService.CreateGroup(req.body, next), next);
    res.send(result);
});


export default routerGroup;
