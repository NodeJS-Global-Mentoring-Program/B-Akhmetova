import { DataTypes } from 'sequelize';
import bcrypt  from 'bcrypt';

import { UserInstance } from '../interfaces/user';
import { sequelize } from '../loaders/postgress';

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'User',
    tableName:'users',
    timestamps: false
});

User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

