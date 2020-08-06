import { v4 as uuid } from 'uuid';
import { IUser } from './interfaces';

export const users: Array<IUser> = [
    {
        id: uuid(),
        login: 'user1',
        password: '12345',
        age: 78,
        isDeleted: false
    },
];