import express from 'express';
import { v4 as uuid } from 'uuid';
import { ValidatedRequest } from 'express-joi-validation';

import { users } from './database';
import { IUser } from './interfaces';
import { getAutoSuggestUsers, getNumber, getString } from './helpers';

//validation
import validator from './validation/validator';
import { IUserSchema } from './validation/interfaces';

const router = express.Router();

//handling errors
//mapping

router.get('/auto-suggest', (req, res, next) => {
    const { query } = req;
    const limit = getNumber(query.limit);
    const loginSubstring = getString(query.loginSubstring);

    res.send(getAutoSuggestUsers(loginSubstring, limit, users));
    next();
});

router.get('/:id', (req, res, next) => {
    const { params } = req;
    const { id } = params;
    const user = users.find((user) => user.id === id)

    if (user) {
        res.send(user);
    }
    else {
        res.send(false)
    }
    next();
});

router.put('/:id', (req, res, next) => {
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
    next();
});

router.delete('/:id', (req, res, next) => {
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
        next();
    }
})

//validation

router.post('/', validator, (req, res, next) => {
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
    next();
})


export default router;