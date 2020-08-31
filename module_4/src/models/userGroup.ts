import { sequelize } from '../loaders/postgress';

import { User } from './user';
import { Group } from './group';

export const UserGroup = sequelize.define('UserGroup', {}, {
    modelName: 'UserGroup',
    tableName:'userGroup',
    timestamps: false
});

User.belongsToMany(Group, { through:'UserGroup' });
Group.belongsToMany(User, { through:'UserGroup' });
