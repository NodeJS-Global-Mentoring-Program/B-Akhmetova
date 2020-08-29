import {  Model } from 'sequelize';

export  type IUserGroup = {
    userId: string,
    groupId: string
};


export interface UserGroupInstance extends Model<IUserGroup, IUserGroup>, IUserGroup {}
