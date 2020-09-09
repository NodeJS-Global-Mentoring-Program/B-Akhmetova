import { Model, DataTypes } from 'sequelize';

export const UserGroupModel = (sequelize: any): any => {
    class UserGroup extends Model {
        public UserId!: string;
        public GroupId!: string;
    }

    UserGroup.init(
        {
            UserId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            GroupId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'UserGroup',
            sequelize
        }
    );

    return UserGroup;
};
