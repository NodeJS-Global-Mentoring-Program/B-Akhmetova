import {  Model } from 'sequelize';
import { Group } from '../types/group';

export interface IGroupInstance extends Model<Group, Group>, Group {}
