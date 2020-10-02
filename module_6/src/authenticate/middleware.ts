import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

export const checkToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): any => {
    const bearearToken = req.headers.authorization;
    const token = bearearToken ? bearearToken.split(' ')[1] : null;

    if (!token) {
        return res
            .status(401)
            .send({ Success: false, Message: 'Access token is absent.' });
    }

    if (typeof token === 'string') {
        jwt.verify(token, config.privateJwtKey, (err) => {
            if (err) {
                return res
                    .status(403)
                    .send({ Success: false, Message: 'Access token is Invalid' });
            }
            next();
        });
    }
};
