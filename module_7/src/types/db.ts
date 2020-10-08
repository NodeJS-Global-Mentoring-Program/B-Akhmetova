import { Sequelize } from 'sequelize/types';

import { IUserInstance } from '../interfaces/user';
import { IGroupInstance } from '../interfaces/group';
import { IUserGroupInstance } from '../interfaces/userGroup';

export type DB = {
  sequelize: {
    username: string;
    password: string;
    host: string;
    dialect: 'postgres';
    database: string;
    port: number;
  };
  Sequelize: Sequelize;
  User: IUserInstance;
  Group: IGroupInstance;
  UserGroup: IUserGroupInstance;
};
