import { v4 as uuid } from 'uuid';

export const initUser = async (User: any) => {
    const user1 = await User.create({
        id: uuid(),
        login: 'user1',
        password: 'password1',
        age: 21
    });

    const user2 = await User.create({
        id: uuid(),
        login: 'user2',
        password: 'password2',
        age: 22
    });

    const user3 = await User.create({
        id: uuid(),
        login: 'user1',
        password: 'password3',
        age: 23
    });

    const user4 = await User.create({
        id: uuid(),
        login: 'user1',
        password: 'password4',
        age: 24
    });

    console.log('[user1]', user1);
    console.log('[user2]', user2);
    console.log('[user3]', user3);
    console.log('[user4]', user4);
};
