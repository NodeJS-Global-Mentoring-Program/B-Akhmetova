import express from 'express';
import { v4 as uuid } from 'uuid';

import { users } from './database';
import { IUser } from './interfaces';
import { getAutoSuggestUsers, getNumber, getString } from './helpers';

const router = express.Router();

//handling errors
//mapping

router.get('/auto-suggest', (req, res) => {
    const { query } = req;
    const limit = getNumber(query.limit);
    const loginSubstring = getString(query.loginSubstring);

    res.send(getAutoSuggestUsers(loginSubstring, limit, users))
});

router.get('/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    const user = users.find((user) => user.id === id)

    if (user) {
        res.send(user);
    }
    else {
        res.send(false)
    }
});

router.put('/:id', (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const userIndex = users.findIndex((user) => user.id === id)

    const newUser: IUser = {
        id: body.id,
        login: body.login,
        password: body.password,
        age: body.age,
        isDeleted: body.isDeleted
    }

    users.splice(userIndex, 1, newUser)
    res.send(users);
});

router.delete('/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    const user = users.find((user) => user.id === id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (user) {
        const deletedUser: IUser = {
            id: user.id,
            login: user.login,
            password: user.password,
            age: user.age,
            isDeleted: true
        }

        users.splice(userIndex, 1, deletedUser)
        res.send(users);
    }
})

router.post('/', (req, res) => {
    const { body } = req;

    const newUser: IUser = {
        id: uuid(),
        login: body.login,
        password: body.password,
        age: body.age,
        isDeleted: body.isDeleted
    }

    users.push(newUser)
    res.send(users);
})


export default router;