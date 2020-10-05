import * as Joi from '@hapi/joi';

export const queryGroupSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.array().items(1, 2, 3, 4, 5).required()
});
