import * as Joi from '@hapi/joi';

export const queryGroupSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.string().required()
});
