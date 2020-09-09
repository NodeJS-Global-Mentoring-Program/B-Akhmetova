import { Sequelize } from 'sequelize';

import config from '../config';

export const sequelize = new Sequelize({
    username: config.dbUserName,
    password: config.dbPassword,
    host: config.dbHost,
    dialect: 'postgres',
    database: config.dbDatabase,
    port: config.dbPort
});

export const getTransaction = async (): Promise<any> => {
    return await sequelize.transaction();
};
