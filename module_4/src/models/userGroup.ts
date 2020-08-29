import { DataTypes } from 'sequelize';

import { UserGroupInstance } from '../interfaces/userGroup';
import { sequelize } from '../loaders/postgress';

import { User } from './user';
import { Group } from './group';

export const UserGroup = sequelize.define<UserGroupInstance>('UserGroup', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Groups',
            key: 'id'
        }
    }
}, {
    modelName: 'UserGroup',
    tableName:'UserGroup',
    timestamps: false
});

UserGroup.belongsTo(User, { as: 'User', foreignKey: 'userId' });
UserGroup.belongsTo(Group, { as: 'Group', foreignKey: 'groupId' });
