import { Sequelize } from 'sequelize';

import fs from 'fs';
import path from 'path';

import config from '../config';

export const sequelize = new Sequelize({
    username: config.dbUserName,
    password:config.dbPassword,
    host:config.dbHost,
    dialect: 'postgres',
    database:config.dbDatabase,
    port:config.dbPort
});

export const postgresLoader = async ():Promise<void> => {
    let sqlInitUsers = '';
    let sqlInitGroups = '';

    fs.readFile(path.resolve(__dirname, '../data-access/initUsers.sql'), (err, data) => {
        if (err) {
            throw Error(err.message);
        }
        sqlInitUsers = data.toString();
    });

    fs.readFile(path.resolve(__dirname, '../data-access/initGroups.sql'), (err, data) => {
        if (err) {
            throw Error(err.message);
        }
        sqlInitGroups = data.toString();
    });

    await sequelize.authenticate();
    await sequelize.query(sqlInitUsers);
    await sequelize.query(sqlInitGroups);
};
