import express from 'express';

import UserService from '../../services/user';
import UserDAL from '../../data-access/UserDAL';

import { getNumber, getString } from '../../utils/parsing';

const userDAL = new UserDAL();
const userService = new UserService(userDAL);

export const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        // process.nextTick(() => {
        //     throw new Error('whoops'); // TO CHECK PROCESS EXEPTIONS
        // });
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const getUserById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.getUserById(req.params.id);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const getAutoSuggestUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);

    try {
        const result = await userService.getAutoSuggestUsers(limit, loginSubstring);
        res.send(result);
        res.status(200);
        return result;
    } catch (error) {
        return  next(error);
    }
};

export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.createUser(req.body);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const addUserToGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.addUsersToGroup(req.body.UserIds, req.body.GroupId);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};


export const loginUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { login, password } = req.body;

    try {
        const result = await userService.loginUser(login, password);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.updateUser(req.body, req.params.id);
        res.send(result);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.send(`Deleted with code ${result}`);
        res.status(200);
    } catch (error) {
        return  next(error);
    }
};
