import express from 'express';
import { v4 as uuid } from 'uuid';

import { users } from '../database/users';
import { IUser } from '../interfaces/user';
import { getAutoSuggestUsers, getNumber, getString } from '../helpers/helpers';

import validator from '../validation/validator';

const routerUser = express.Router();

routerUser.get('/auto-suggest', (req, res) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);

    res.send(getAutoSuggestUsers(loginSubstring, limit, users));
});

routerUser.get('/', (req, res) => {
    if (!!users.length) {
        res.send(users);
    } else {
        res.status(404).end("Any user wasn't found");
    }
});


routerUser.get('/:id', (req, res) => {
    const user = users.find((item) => item.id === req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).end("Any user wasn't found");
    }
});

routerUser.put('/:id', (req, res) => {
    const userIndex = users.findIndex((user) => user.id === req.params.id);
    if (userIndex) {
        const { id, login, password, age, isDeleted } = users[userIndex];
        const newUser: IUser = {
            id: req.body.id || id,
            login: req.body.login || login,
            password: req.body.password || password,
            age: req.body.age || age,
            isDeleted: req.body.isDeleted || isDeleted
        };

        users.splice(userIndex, 1, newUser);

        res.send(users);
    } else {
        res.status(404).end("Couldn't update user, because any user wasn't found with this id");
    }
});

routerUser.delete('/:id', (req, res) => {
    const { params: { id } } = req;
    const user = users.find((item) => item.id === id);

    if (user) {
        const userIndex = users.findIndex((item) => item.id === id);
        users[userIndex].isDeleted = true;
        res.send(`User with id ${id} was  succesfully deleted`);
    } else {
        res.status(404).end(`Couldn't delete user, because any user wasn't found with this id ${id}`);
    }
});

routerUser.post('/', validator, (req, res) => {
    const { id, login, password, age, isDeleted } = req.body;

    const newUser: IUser = {
        id: id || uuid(),
        login,
        password,
        age,
        isDeleted
    };

    users.push(newUser);
    res.send(users);
});


export default routerUser;
