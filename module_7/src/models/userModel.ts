import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export const UserModel = (sequelize: any): any => {
    class User extends Model {
        public id!: string;
        public login!: string;
        public password!: string;
        public age!: number;
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuid(),
                allowNull: false
            },
            login: {
                type: new DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(100),
                allowNull: false
            },
            age: {
                type: new DataTypes.INTEGER(),
                allowNull: false
            }
        },
        {
            tableName: 'Users',
            sequelize
        }
    );

    User.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    return User;
};
