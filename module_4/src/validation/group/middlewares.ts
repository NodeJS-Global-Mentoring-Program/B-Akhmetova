
import express from 'express';

import validator from './validator';

export const middlewareValidatorGroup = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<any> =>
    await validator.validatorGroup(req, res, next);
