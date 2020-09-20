import express from 'express';

import usersRouter from '../controllers/user';
import groupRouter from '../controllers/group';

import { uncaughtExeptionLogger, logger } from '../logger/uncaughtExLogger';

export default async (app: express.Application): Promise<express.Application> => {
    app.use(express.json());
    app.use('/users', usersRouter);
    app.use('/groups', groupRouter);
    app.use(
        (
            errObj: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            if (errObj && errObj.error && errObj.error.isJoi) {
                res
                    .status(400)
                    .end(`Error. ${errObj.error.toString().replace(/\. /g, '. \n')}.`);
            }
            next(errObj);
        }
    );
    app.use(uncaughtExeptionLogger);
    process.on('uncaughtException', (error) => {
        logger.error(error.message, { error });
        throw error;
    });

    return app;
};
