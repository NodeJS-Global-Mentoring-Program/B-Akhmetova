import express from 'express';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

export const uncaughtExeptionLogger = (
    errorObj: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!(errorObj && errorObj.error && errorObj.error.isJoi)) {
        logger.log('error', 'Message: Internal Server Error.');
        res.sendStatus(500);
    }
};

