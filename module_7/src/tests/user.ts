import request from './request';

export const getUsers = async () => {
    return await request('http://127.0.0.1:9000/users/').then(users => users);
};
