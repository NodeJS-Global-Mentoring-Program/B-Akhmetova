import { createValidator } from 'express-joi-validation';

import { queryUserSchema, queryUserSchemaOnUpdate } from './schema';

const validatorCreate = createValidator({ passError: true });
const validatorUpdate = createValidator({ passError: true });


export default  {
    validatorCreateUser: validatorCreate.body(queryUserSchema),
    validatorUpdateUser:validatorUpdate.body(queryUserSchemaOnUpdate)
};
