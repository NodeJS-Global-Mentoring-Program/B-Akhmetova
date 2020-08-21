import {  Model } from 'sequelize';

export type IUser = {
    id: string,
    login: string,
    password: string,
    age: number
}

export interface UserInstance extends Model<IUser, IUser>, IUser {}
