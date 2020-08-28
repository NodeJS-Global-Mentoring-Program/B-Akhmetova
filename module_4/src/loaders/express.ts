import express from 'express';

import usersRouter from '../controllers/user';

export default  (app: express.Application): express.Application => {
    app.use(express.json());
    app.use('/users', usersRouter);
    app.use((errObj: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (errObj && errObj.error && errObj.error.isJoi) {
            res.status(400).end(`Error. ${errObj.error.toString().replace(/\. /g, '. \n')}.`);
        }

        // if (errObj && errObj.code) {
        //     res.status(errObj.code);
        //     res.send(`Error: ${errObj.message}`);
        // }
        // if (errObj && !errObj.code) {
        //     res.status(500);
        //     res.status(500).send('Something broke!');
        // }
        next(errObj);
    });

    return app;
};
