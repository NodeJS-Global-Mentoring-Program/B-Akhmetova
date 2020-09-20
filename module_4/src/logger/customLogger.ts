import express from 'express';

export const customLogger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const method = req.method;
    const args = ['GET', 'DELETE'].includes(method) ? req.params : req.body;
    const currentDatetime = new Date().toString();

    const loggerData = `
    Method: ${method}
    Arguments: ${JSON.stringify(args)}
    Date: ${currentDatetime}`;
    console.log(loggerData);
    next();
};
