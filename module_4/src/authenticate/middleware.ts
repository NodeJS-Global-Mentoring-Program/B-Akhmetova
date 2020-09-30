import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

export const checkToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): any => {
    const token = req.headers['x-access-token'];

    console.log('[token]', token);

    if (!token) {
        return res
            .status(401)
            .send({ Success: false, Message: 'Unauthorized error. Access token is absent.' });
    }

    if (typeof token === 'string') {
        jwt.verify(token, config.privateJwtKey, (err) => {
            if (err) {
                return res
                    .status(401)
                    .send({ Success: false, Message: 'Failed to authenticate with token' });
            }
            next();
        });
    }
};
