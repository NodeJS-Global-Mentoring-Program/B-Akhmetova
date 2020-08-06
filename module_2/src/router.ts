import express from 'express';

import { users } from './database';
import { IUser } from './interfaces';

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log(req.params)
    res.send(users);
});

router.put('/:id', (req, res) => {
    const { id, body } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);

    // const newUser: IUser = {
    //     id: body.id as string,
    //     login: body.login,
    //     password: body.password,
    //     age: body.age,
    //     isDeleted: body.isDeleted
    // }
    const newUser = body as unknown as IUser;

    users.splice(userIndex, 1, newUser)


    res.send('put method');
});

router.delete('/:id', (req, res) => {
    res.send('delete method');
})

router.post('/', (req, res) => {
    res.send('post method');
})


export default router;