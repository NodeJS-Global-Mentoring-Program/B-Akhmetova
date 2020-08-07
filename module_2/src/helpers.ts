import { IUser } from './interfaces';

export const getAutoSuggestUsers = (loginSubstring: string, limitInput: number, users: Array<IUser>) => {
    const regex = RegExp(loginSubstring.toLowerCase());
    const countOfUsers = users.length;
    let resultUsers: Array<IUser> = [];
    let limit = limitInput;

    if (limitInput === 0)
        return resultUsers;
    if (limitInput > countOfUsers)
        limit = countOfUsers;


    if (!!users.length && limit) {
        resultUsers = users;
        resultUsers.sort(compareLogins);
        resultUsers = resultUsers.filter(user => regex.test(user.login.toLowerCase()))
        resultUsers = resultUsers.slice(0, limit);
    }
    return resultUsers;
}

const compareLogins = (firstItem: IUser, secondItem: IUser) => {
    if (firstItem.login.toLowerCase() < secondItem.login.toLowerCase())
        return -1;
    if (firstItem.login.toLowerCase() > secondItem.login.toLowerCase())
        return 1;
    return 0;
}

export const getNumber = (input: any) => {
    const number = parseInt(input);
    return number || 0;
}

export const getString = (input: any) => input.toString();