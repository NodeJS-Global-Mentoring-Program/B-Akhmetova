
import express from 'express';

import validator from './validator';

export const middlewareValidatorCreate = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<any> =>
    await validator.validatorCreateUser(req, res, next);

export const   middlewareValidatorUpdate = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> =>
    await validator.validatorUpdateUser(req, res, next);
