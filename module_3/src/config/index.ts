import dotenv from 'dotenv';

import { IEnv } from '../interfaces/app';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (dotenv.config().error) {
    throw new Error("Couldn't find .env file");
}

const envVariables: IEnv = {
    appName: process.env.APP_NAME,

    appPort: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,

    dbDialect: process.env.DB_DIALECT,

    dbHost: process.env.DB_HOST,

    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,

    dbDatabase: process.env.DB_DATABASE,

    dbUserName: process.env.DB_USERNAME,

    dbPassword: process.env.DB_PASSWORD
};

export default envVariables;
