import express from 'express';

import expressLoader from './express';
import { postgresLoader } from './postgress';

// start up modules

export default async (expressApp: express.Application): Promise<void> => {
    await expressLoader(expressApp);
    try {
        await postgresLoader();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
