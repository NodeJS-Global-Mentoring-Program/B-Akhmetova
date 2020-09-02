import { DataTypes } from 'sequelize';

import { GroupInstance } from '../interfaces/group';

import { sequelize } from '../loaders/postgress';

export const Group = sequelize.define<GroupInstance>('Group', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'Group',
    tableName:'Groups',
    timestamps: false
});

