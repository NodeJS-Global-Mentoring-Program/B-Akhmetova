import express from 'express';

import expressLoader from './express';

// start up modules

export default async (expressApp: express.Application): Promise<void> => {
    await expressLoader(expressApp);
};
