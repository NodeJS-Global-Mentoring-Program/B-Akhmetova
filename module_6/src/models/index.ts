
import { Sequelize } from 'sequelize';

import { GroupModel } from '../models/groupModel';
import { UserModel } from '../models/userModel';
import { UserGroupModel } from '../models/userGroupModel';

import config from '../config';

const createModels = (sequelize: any): any => {
    const db = {
        sequelize,
        Sequelize,
        User: UserModel(sequelize),
        Group: GroupModel(sequelize),
        UserGroup: UserGroupModel(sequelize)
    };

    return db;
};

const sequelize = new Sequelize({
    username: config.dbUserName,
    password: config.dbPassword,
    host: config.dbHost,
    dialect: 'postgres',
    database: config.dbDatabase,
    port: config.dbPort
});

const db = createModels(sequelize);
db.User.belongsToMany(db.Group, { through: 'UserGroup' });
db.Group.belongsToMany(db.User, { through: 'UserGroup' });
db.UserGroup.belongsTo(db.User);
db.UserGroup.belongsTo(db.Group);

export default db;
