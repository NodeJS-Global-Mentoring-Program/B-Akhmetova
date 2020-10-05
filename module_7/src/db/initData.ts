import { v4 as uuid } from 'uuid';

export default async (db: any) => {
    // creation users

    const user1 = await db.User.create({
        id: uuid(),
        login: 'user1',
        password: 'password1',
        age: 21
    });

    const user2 = await db.User.create({
        id: uuid(),
        login: 'user2',
        password: 'password2',
        age: 22
    });

    await db.User.create({
        id: uuid(),
        login: 'user1',
        password: 'password3',
        age: 23
    });

    await db.User.create({
        id: uuid(),
        login: 'user1',
        password: 'password4',
        age: 24
    });

    // creation users


    const group1 = await db.Group.create({
        id: uuid(),
        name: 'group1',
        permissions: [1, 2]
    });

    const group2 = await db.Group.create({
        id: uuid(),
        name: 'group2',
        permissions: [3, 4]
    });

    await db.Group.create({
        id: uuid(),
        name: 'group3',
        permissions: [2, 5]
    });

    await db.Group.create({
        id: uuid(),
        name: 'group4',
        permissions: [1, 2, 3]
    });

    // creation relation

    await db.UserGroup.create({
        UserId:user1.id,
        GroupId: group2.id
    });

    await db.UserGroup.create({
        UserId:user2.id,
        GroupId: group1.id
    });
};
