import * as Joi from '@hapi/joi';

const loginPattern = /^[a-zA-Zа-яА-Я]{3,15}[-_.]{0,3}[0-9]{0,4}$/;
const passwordPattern = /^(?=.*\d{2,})(?=.*[a-zA-Zа-яА-Я]{6,})[a-zA-Zа-яА-Я\d]{8,}$/;

export const queryUserSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().regex(loginPattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});
