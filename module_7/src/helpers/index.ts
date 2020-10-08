import { v4 as uuid } from 'uuid';

import { User } from '../types/user';

export const getAutoSuggest = (loginSubstring: string, limitInput: number, users: any):User[] => {
    const regex = RegExp(loginSubstring.toLowerCase());
    const countOfUsers = users.length;
    let resultUsers: Array<User> = [];
    let limit = limitInput;

    if (limitInput === 0) {
        return resultUsers;
    }
    if (limitInput > countOfUsers) {
        limit = countOfUsers;
    }


    if (!!users.length && limit) {
        resultUsers = users;
        resultUsers.sort(compareLogins);
        resultUsers = resultUsers.filter(user => regex.test(user.login.toLowerCase()));
        resultUsers = resultUsers.slice(0, limit);
    }
    return resultUsers;
};

const compareLogins = (firstItem: User, secondItem: User) => {
    if (firstItem.login.toLowerCase() < secondItem.login.toLowerCase()) {
        return -1;
    }
    if (firstItem.login.toLowerCase() > secondItem.login.toLowerCase()) {
        return 1;
    }
    return 0;
};

export const createNewUser = (fields: User): User => {
    return {
        id: fields.id || uuid(),
        login : fields.login,
        password: fields.password,
        age: fields.age
    };
};
