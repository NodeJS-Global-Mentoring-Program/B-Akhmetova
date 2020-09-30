import express from 'express';

import { middlewareValidatorCreate, middlewareValidatorUpdate }  from '../validation/user/middlewares';

import UserService from '../services/user';

import UserDAL from '../data-access/UserDAL';

import { getNumber, getString } from '../utils/parsing';

import { customLogger } from '../logger/customLogger';

import { checkToken } from '../authenticate/middleware';

const routerUser = express.Router();

const userDAL = new UserDAL();
const userService = new UserService(userDAL);

routerUser.get('/auto-suggest', checkToken, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);

    try {
        const result = await userService.getAutoSuggestUsers(limit, loginSubstring);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.get('/', checkToken, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        // process.nextTick(() => {
        //     throw new Error('whoops'); // TO CHECK PROCESS EXEPTIONS
        // });
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);


routerUser.get('/:id', checkToken, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getUserById(req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.put('/:id', middlewareValidatorUpdate, checkToken, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.updateUser(req.body, req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.delete('/:id', checkToken, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.send(`Deleted with code ${result}`);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.post('/', middlewareValidatorCreate, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.createUser(req.body);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.post('/addUsersToGroup', checkToken, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.addUsersToGroup(req.body.UserIds, req.body.GroupId);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

routerUser.post('/login', async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { login, password } = req.body;

    try {
        const result = await userService.loginUser(login, password);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
}, customLogger);

export default routerUser;
