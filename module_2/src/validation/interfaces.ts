import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface IUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string,
        login: string,
        password: string,
        age: number,
        isDeleted: boolean
    }
}
