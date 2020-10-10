import { v4 as uuid } from 'uuid';

export const fakeUsers = [
    {
        id: uuid(),
        login: 'user1',
        password: 'password1',
        age: 21
    },
    {
        id: uuid(),
        login: 'user2',
        password: 'password2',
        age: 89
    }
];
