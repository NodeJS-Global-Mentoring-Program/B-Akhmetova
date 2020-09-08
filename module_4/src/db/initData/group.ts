import { v4 as uuid } from 'uuid';

export const initGroup = async (Group: any) => {
    const group1 = await Group.create({
        id: uuid(),
        name: 'group1',
        permissions: 'READ'
    });

    const group2 = await Group.create({
        id: uuid(),
        name: 'group2',
        permissions: 'READ'
    });

    const group3 = await Group.create({
        id: uuid(),
        name: 'group3',
        permissions: 'READ'
    });

    const group4 = await Group.create({
        id: uuid(),
        name: 'group4',
        permissions: 'READ'
    });

    console.log('[group1]', group1);
    console.log('[group2]', group2);
    console.log('[group3]', group3);
    console.log('[group4]', group4);
};
