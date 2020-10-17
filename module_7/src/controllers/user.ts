import express from 'express';

import { middlewareValidatorCreate, middlewareValidatorUpdate }  from '../validation/user/middlewares';

import { customLogger } from '../logger/customLogger';

import { checkToken } from '../authenticate/middleware';

import {
    getAllUsers,
    getUserById,
    getAutoSuggestUsers,
    createUser,
    addUserToGroup,
    loginUser,
    updateUser,
    deleteUser } from './controller-methods/user';

const routerUser = express.Router();

routerUser.get('/', checkToken, getAllUsers, customLogger);

routerUser.get('/:id', checkToken, getUserById, customLogger);

routerUser.get('/auto-suggest', checkToken, getAutoSuggestUsers, customLogger);

routerUser.post('/', middlewareValidatorCreate, createUser, customLogger);

routerUser.post('/addUsersToGroup', checkToken, addUserToGroup, customLogger);

routerUser.post('/login', loginUser, customLogger);

routerUser.put('/:id', middlewareValidatorUpdate, checkToken, updateUser, customLogger);

routerUser.delete('/:id', checkToken, deleteUser, customLogger);


export default routerUser;
