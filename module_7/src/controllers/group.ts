import express from 'express';

import { middlewareValidatorGroup } from '../validation/group/middlewares';
import { customLogger } from '../logger/customLogger';
import { checkToken } from '../authenticate/middleware';
import {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup } from './controller-methods/group';

const routerGroup = express.Router();

routerGroup.get('/', checkToken, getAllGroups, customLogger);

routerGroup.get('/:id', checkToken, getGroupById, customLogger);

routerGroup.put('/:id', middlewareValidatorGroup, checkToken, updateGroup, customLogger);

routerGroup.delete('/:id', checkToken, deleteGroup, customLogger);

routerGroup.post('/', middlewareValidatorGroup, createGroup, customLogger);


export default routerGroup;
