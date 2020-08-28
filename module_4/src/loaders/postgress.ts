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
    let sql = '';

    fs.readFile(path.resolve(__dirname, '../data-access/initUsers.sql'), (err, data) => {
        if (err) {
            throw Error(err.message);
        }
        sql = data.toString();
    });

    await sequelize.authenticate();
    await sequelize.query(sql);
};
