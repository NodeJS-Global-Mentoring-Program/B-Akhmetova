import express from 'express';

import { middlewareValidatorCreate, middlewareValidatorUpdate }  from '../validation/user/middlewares';

import UserService from '../services/user';
import UserGroupService from '../services/userGroup';

import UserDAL from '../data-access/UserDAL';
import UserGroupDAL from '../data-access/UserGroupDAL';

import { getNumber, getString } from '../utils/parsing';
import { handleQuery } from '../utils/error';

import { getTransaction } from '../loaders/postgress';

const routerUser = express.Router();
const userDAL = new UserDAL();
const userGroupDAL = new UserGroupDAL();

const userService = new UserService(userDAL);
const userGroupService = new UserGroupService(userGroupDAL);

const transaction = getTransaction();

routerUser.get('/auto-suggest', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);
    const result = await userService.GetAutoSuggestUsers(limit, loginSubstring, next);
    res.send(result);
});

routerUser.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const usersDB = await userService.GetAllUsers(next);
    res.send(usersDB);
});


routerUser.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(userService.GetUserById(req.params.id, next), next);
    res.send(result);
});

routerUser.put('/:id', middlewareValidatorUpdate, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(userService.UpdateUser(req.body, req.params.id, next), next);
    res.send(result);
});

routerUser.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const deletedNum = await handleQuery(userService.DeleteUser(req.params.id, next), next);
    await handleQuery(userGroupService.DeleteRecordsWithUserId(req.params.id, next), next);

    if (deletedNum) {
        res.send(`User with id ${req.params.id} successfully deleted`);
    }
    res.send(`User with id ${req.params.id} isn't exist or has already deleted`);
});

routerUser.post('/', middlewareValidatorCreate, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(userService.CreateUser(req.body, next), next);
    res.send(result);
});

routerUser.post('/addUsersToGroup', async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await handleQuery(userService.AddUsersToGroup(req.body.userId, req.body.groupId, transaction, next), next);
    res.send(result);
});

export default routerUser;
