import { v4 as uuid } from 'uuid';

import { mockUser } from '../../types/user';

const db: mockUser[] = [
    {
        id: '788bfdc7-4c7b-409e-b606-7f9d91b19dde',
        login: 'user1',
        password: 'password1',
        age: 21,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'user2',
        password: 'password2',
        age: 45,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'user3',
        password: 'password3',
        age: 36,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'user4',
        password: 'password4',
        age: 67,
        isDeleted: false
    }
];

export default db;
