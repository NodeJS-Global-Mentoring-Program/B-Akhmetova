import { Model, DataTypes } from 'sequelize';

import { v4 as uuid } from 'uuid';

export const GroupModel = (sequelize: any): any => {
    class Group extends Model {
        public id!: string;
        public name!: string;
        public permissions!: string;
    }

    Group.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:uuid(),
                allowNull:false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.DECIMAL),
                allowNull: true
            }
        },
        {
            tableName: 'Groups',
            sequelize
        }
    );

    return Group;
};
