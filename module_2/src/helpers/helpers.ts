import { v4 as uuid } from 'uuid';

import { IUser } from '../interfaces/user';

export const getAutoSuggestUsers = (loginSubstring: string, limitInput: number, users: Array<IUser>):Array<IUser> => {
    const regex = RegExp(loginSubstring.toLowerCase());
    const countOfUsers = users.length;
    let resultUsers: Array<IUser> = [];
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

const compareLogins = (firstItem: IUser, secondItem: IUser) => {
    if (firstItem.login.toLowerCase() < secondItem.login.toLowerCase()) {
        return -1;
    }
    if (firstItem.login.toLowerCase() > secondItem.login.toLowerCase()) {
        return 1;
    }
    return 0;
};

export const updateUser = (fields: IUser, user:IUser): IUser => {
    return {
        id: fields.id || user.id,
        login : fields.login || user.login,
        password: fields.password || user.password,
        age: fields.age || user.age,
        isDeleted: fields.isDeleted || user.isDeleted
    };
};

export const createUser = (fields: IUser): IUser => {
    return {
        id: fields.id || uuid(),
        login : fields.login,
        password: fields.password,
        age: fields.age,
        isDeleted: fields.isDeleted
    };
};
