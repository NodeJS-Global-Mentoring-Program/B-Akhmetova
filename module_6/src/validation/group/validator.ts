import { createValidator } from 'express-joi-validation';

import {  queryGroupSchema } from './schema';

const validator = createValidator({ passError: true });

export default  { validatorGroup: validator.body(queryGroupSchema) };
