import {  Model } from 'sequelize';
import { User } from '../types/user';

export interface IUserInstance extends Model<User, User>, User {}
