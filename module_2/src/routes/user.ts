import express from 'express';

import { users } from '../database/users';
import { getAutoSuggestUsers, updateUser, createUser } from '../helpers/helpers';
import { getNumber, getString } from '../utils/parsing';
import validator from '../validation/validator';

const routerUser = express.Router();

routerUser.get('/auto-suggest', (req, res) => {
    const limit = getNumber(req.query.limit);
    const loginSubstring = getString(req.query.loginSubstring);
    res.send(getAutoSuggestUsers(loginSubstring, limit, users));
});

routerUser.get('/', (req, res) => {
    res.send(users);
});


routerUser.get('/:id', (req, res) => {
    const user = users.find((item) => item.id === req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).end(`Any user wasn't found with id ${req.params.id}`);
    }
});

routerUser.put('/:id', validator, (req, res) => {
    const userIndex = users.findIndex((user) => user.id === req.params.id);
    if (userIndex !== -1) {
        const updatedUser = updateUser(req.body, users[userIndex]);
        users.splice(userIndex, 1, updatedUser);
        res.send(`User with id ${req.params.id} was  succesfully updated`);
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
    const newUser = createUser(req.body);

    if (newUser) {
        users.push(newUser);
        res.send('New user was  succesfully added');
    } else {
        res.status(500).end('Operation is failed');
    }
});


export default routerUser;
