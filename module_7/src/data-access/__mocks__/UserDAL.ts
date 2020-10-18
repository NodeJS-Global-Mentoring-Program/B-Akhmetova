import { mockUser } from '../../types/user';

import db from './fakeDB';

export default class UserDAL {
    getAllUsers(): Promise<mockUser[]>  {
        return Promise.resolve(db);
    }

    getUserById(id: string): Promise<mockUser|undefined>  {
        return Promise.resolve(db.find(user => user.id === id));
    }

    createUser(userDTO: mockUser): Promise<any> {
        return Promise.resolve(db.push(userDTO));
    }

    updateUser(userData: mockUser, id: string): Promise<mockUser[]|number> {
        const userIndex = db.findIndex((user) => user.id === id);
        db.splice(userIndex, 1, userData);
        return Promise.resolve(1);
    }

    deleteUser(id: string): Promise<number> {
        const user = db.find((u) => u.id === id);
        const userIndex = db.findIndex((u) => u.id === id);

        if (user) {
            const deletedUser: mockUser = {
                id: user.id,
                login: user.login,
                password: user.password,
                age: user.age,
                isDeleted: true
            };

            db.splice(userIndex, 1, deletedUser);
            return Promise.resolve(1);
        }
        return Promise.resolve(0);
    }

    getUserByLogin(login:string): Promise<mockUser|undefined>  {
        return Promise.resolve(db.find(u => u.login === login));
    }
}
