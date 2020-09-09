import { Model } from 'sequelize';
import { UserGroup } from '../types/userGroup';

export interface IUserGroupInstance extends Model<UserGroup, UserGroup>, UserGroup {}
