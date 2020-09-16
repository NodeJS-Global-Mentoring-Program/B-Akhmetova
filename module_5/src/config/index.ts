import dotenv from 'dotenv';

import { IEnv } from '../interfaces/app';

if (dotenv.config().error) {
    throw new Error("Couldn't find .env file");
}

const envVariables: IEnv = {
    appName: process.env.APP_NAME || '',

    appPort: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 9000,

    dbDialect: process.env.DB_DIALECT || '',

    dbHost: process.env.DB_HOST || '',

    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5421,

    dbDatabase: process.env.DB_DATABASE || '',

    dbUserName: process.env.DB_USERNAME || '',

    dbPassword: process.env.DB_PASSWORD || '',

    node_env: process.env.NODE_ENV || 'development'
};

export default envVariables;
