import express from 'express';

import expressLoader from './express';
import { launchDB } from './sequelize';

import db from '../models';

// start up modules

export default async (expressApp: express.Application): Promise<void> => {
    await expressLoader(expressApp);
    await launchDB(db);
};
