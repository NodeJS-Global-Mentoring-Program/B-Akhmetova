import express from 'express';
import { transports } from 'winston';

import usersRouter from '../controllers/user';
import groupRouter from '../controllers/group';

import { logger } from '../logger/loggerWinston';
import { uncaughtExeptionLogger } from '../logger/uncaughtExLogger';

export default async (app: express.Application): Promise<express.Application> => {
    app.use(express.json());
    app.use('/users', usersRouter);
    app.use('/groups', groupRouter);
    app.use(uncaughtExeptionLogger);
    process.on('uncaughtException', () => {
        logger.exceptions.handle(
            new transports.File({ filename: 'exceptions.log' })
        );
    });
    process.on('unhandledRejection', () => {
        logger.add(new transports.File({ filename: 'rejections.log' }));
    });

    return app;
};
