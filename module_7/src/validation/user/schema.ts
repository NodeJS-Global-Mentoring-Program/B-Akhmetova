import * as Joi from '@hapi/joi';

import { loginPattern, passwordPattern } from './constants';

export const queryUserSchema = Joi.object({
    id: Joi.string(),
    login: Joi.string().regex(loginPattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export const queryUserSchemaOnUpdate = Joi.object({
    id: Joi.string(),
    login: Joi.string().regex(loginPattern),
    age: Joi.number().integer().min(4).max(130)
});

