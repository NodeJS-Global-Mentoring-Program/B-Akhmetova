import express from 'express';
import { v4 as uuid } from 'uuid';

import { users } from '../database/users';
import { IUser } from '../interfaces/user';
import { getAutoSuggestUsers, getNumber, getString } from '../helpers/helpers';

import validator from '../validation/validator';

const routerUser = express.Router();

routerUser.get('/auto-suggest', (req, res) => {
    const { query } = req;
    const limit = getNumber(query.limit);
    const loginSubstring = getString(query.loginSubstring);

    res.send(getAutoSuggestUsers(loginSubstring, limit, users));
});

routerUser.get('/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    const user = users.find((item) => item.id === id);

    if (user) {
        res.send(user);
    } else {
        res.send(false);
    }
});

routerUser.put('/:id', (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const userIndex = users.findIndex((user) => user.id === id);

    const newUser: IUser = {
        id: body.id,
        login: body.login,
        password: body.password,
        age: body.age,
        isDeleted: body.isDeleted
    };

    users.splice(userIndex, 1, newUser);
    res.send(users);
});

routerUser.delete('/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    const user = users.find((item) => item.id === id);
    const userIndex = users.findIndex((item) => item.id === id);

    if (user) {
        const deletedUser: IUser = {
            id: user.id,
            login: user.login,
            password: user.password,
            age: user.age,
            isDeleted: true
        };

        users.splice(userIndex, 1, deletedUser);
        res.send(users);
    }
});

// validation

routerUser.post('/', validator, (req, res) => {
    const { body } = req;

    const newUser: IUser = {
        id: uuid(),
        login: body.login,
        password: body.password,
        age: body.age,
        isDeleted: body.isDeleted
    };

    users.push(newUser);
    res.send(users);
});


export default routerUser;
