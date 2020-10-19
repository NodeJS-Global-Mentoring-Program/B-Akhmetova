import { v4 as uuid } from 'uuid';

import { mockGroup } from '../../types/group';

const db: mockGroup[] = [
    {
        id: '788bfdc7-4c7b-409e-b606-7f9d91b19dui',
        name: 'group1',
        permissions: [1, 2]
    },
    {
        id: uuid(),
        name: 'group2',
        permissions: [3, 4]
    },
    {
        id: uuid(),
        name: 'group3',
        permissions: [2, 3]
    },
    {
        id: uuid(),
        name: 'group4',
        permissions: [1, 5]
    },
    {
        id: uuid(),
        name: 'group5',
        permissions: [1, 3]
    }
];

export default db;
