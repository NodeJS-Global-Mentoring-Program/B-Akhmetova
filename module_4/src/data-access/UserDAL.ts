import { IUser } from '../interfaces/user';

import db from '../models';

import sequelize from '../db/connnection';


export default class UserDAL {
    getAllUsers(): Promise<IUser[]|  void>  {
        return db.User.findAll();
    }

    getUserById(id: string): Promise<IUser| null |void>  {
        return db.User.findByPk(id);
    }

    createUser(userDTO: IUser): Promise<IUser |void> {
        return db.User.create(userDTO);
    }

    updateUser(userData: IUser, id: string): Promise<any> {
        return db.User.update(userData, { where: { id } });
    }

    deleteUser(id: string): Promise<number | void> {
        return db.User.destroy({ where: { id } });
    }

    async addUsersToGroup(userId: string, groupId: string): Promise<any |void> {
        try {
            await sequelize.transaction(async (t) => {
                const relation =   await db.UserGroup.create({
                    UserId: userId,
                    GroupId: groupId
                }, { transaction: t });

                return relation;
            });
        } catch (error) {
            console.log(error);
        }
    }
}
