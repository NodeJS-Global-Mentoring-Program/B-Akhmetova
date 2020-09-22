import express from 'express';
import { logger } from './loggerWinston';

export const uncaughtExeptionLogger = (
    errorObj: any,
    req: express.Request,
    res: express.Response
) => {
    if (errorObj && errorObj.error && errorObj.error.isJoi) {
        res
            .status(400)
            .end(`Error. ${errorObj.error.toString().replace(/\. /g, '. \n')}.`);
    } else {
        logger.log('error', 'Message: Internal Server Error.');
        res.sendStatus(500);
    }
};

