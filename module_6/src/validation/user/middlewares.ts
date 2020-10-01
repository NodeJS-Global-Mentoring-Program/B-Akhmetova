import express from 'express';

import validator from './validator';

export const middlewareValidatorCreate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<any> => validator.validatorCreateUser(req, res, next);

export const middlewareValidatorUpdate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<any> => validator.validatorUpdateUser(req, res, next);
