import express from "express";

export const customLogger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const currentDatetime = new Date().toString();
    const loggerData = `
    Method: ${req.method}
    Arguments: ${JSON.stringify(req.params)}
    Date: ${currentDatetime}`;
    console.log(loggerData);
    next();
};
