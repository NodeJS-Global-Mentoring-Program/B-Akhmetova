import { sequelize } from '../loaders/postgress';

import { User } from './user';
import { Group } from './group';

export const UserGroup = sequelize.define('UserGroup', {
}, {
    modelName: 'UserGroup',
    tableName:'UserGroup',
    timestamps: false
});

User.belongsToMany(Group, { through:'UserGroup', onDelete:'cascade', foreignKey: 'userId', otherKey:'groupId' });
Group.belongsToMany(User, { through:'UserGroup', onDelete:'cascade', foreignKey: 'groupId', otherKey:'userId' });

