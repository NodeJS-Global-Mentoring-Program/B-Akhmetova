import express from 'express';

import usersRouter from '../controllers/user';
import groupRouter from '../controllers/group';

import { initUser } from '../db/initData/user';
import { initGroup } from '../db/initData/group';

import db from '../models';

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

    await db.sequelize.sync({ force: true });
    await db.sequelize.authenticate();
    await initUser(db.User);
    await initGroup(db.Group);

    return app;
};
