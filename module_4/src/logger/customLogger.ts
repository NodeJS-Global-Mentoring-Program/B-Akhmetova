import express from 'express';

export const customLogger = (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const method = req.method;
    const args = ['GET', 'DELETE'].includes(method) ? req.params : req.body;

    const loggerData = `
    Method: ${method}
    Arguments: ${JSON.stringify(args)}
    Message: ${error.message}`;

    console.log(loggerData);
    next(error);
};
