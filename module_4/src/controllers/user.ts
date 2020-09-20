import express from 'express';

import { middlewareValidatorCreate, middlewareValidatorUpdate }  from '../validation/user/middlewares';

import UserService from '../services/user';

import UserDAL from '../data-access/UserDAL';

import { getNumber, getString } from '../utils/parsing';

import { customLogger } from '../logger/customLogger';

const routerUser = express.Router();

const userDAL = new UserDAL();
const userService = new UserService(userDAL);

routerUser.get('/auto-suggest', customLogger, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);

    try {
        const result = await userService.getAutoSuggestUsers(limit, loginSubstring);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});

routerUser.get('/', customLogger, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        // process.nextTick(() => {
        //     throw new Error('whoops'); //TO CHECK PROCESS EXEPTIONS
        // });
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});


routerUser.get('/:id', customLogger, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getUserById(req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});

routerUser.put('/:id', customLogger, middlewareValidatorUpdate, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.updateUser(req.body, req.params.id);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});

routerUser.delete('/:id', customLogger, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.send(`Deleted with code ${result}`);
    } catch (error) {
        return  next(error);
    }
});

routerUser.post('/', customLogger, middlewareValidatorCreate, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.createUser(req.body);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});

routerUser.post('/addUsersToGroup', customLogger, async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.addUsersToGroup(req.body.UserIds, req.body.GroupId);
        res.send(result);
    } catch (error) {
        return  next(error);
    }
});

export default routerUser;
