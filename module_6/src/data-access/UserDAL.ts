import { User } from '../types/user';
import { UserGroup } from '../types/userGroup';

import db from '../models';

import sequelize from '../db/connnection';


export default class UserDAL {
    getAllUsers(): Promise<User[]>  {
        return db.User.findAll();
    }

    getUserById(id: string): Promise<User|null>  {
        return db.User.findByPk(id);
    }

    createUser(userDTO: User): Promise<User> {
        return db.User.create(userDTO);
    }

    updateUser(userData: User, id: string): Promise<User[]|number> {
        return db.User.update(userData, { where: { id } });
    }

    deleteUser(id: string): Promise<number> {
        return db.User.destroy({ where: { id } });
    }

    async addUsersToGroup(userIds: Array<string>, groupId: string): Promise<UserGroup|void> {
        try {
            await sequelize.transaction(async (t) => {
                const promises: Array<any> = [];
                userIds.forEach(userId => {
                    const newPromise = db.UserGroup.create({
                        UserId: userId,
                        GroupId: groupId
                    }, { transaction: t });
                    promises.push(newPromise);
                });


                return Promise.all(promises);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
