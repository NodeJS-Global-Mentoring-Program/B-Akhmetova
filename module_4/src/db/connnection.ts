import { Sequelize } from 'sequelize';

import config from '../config';

export default new Sequelize({
    username: config.dbUserName,
    password: config.dbPassword,
    host: config.dbHost,
    dialect: 'postgres',
    database: config.dbDatabase,
    port: config.dbPort
});
