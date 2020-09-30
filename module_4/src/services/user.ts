import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserDAL from '../data-access/UserDAL';

import { User } from '../types/user';
import { UserGroup } from '../types/userGroup';

import config from '../config';
import { getAutoSuggest, createNewUser } from '../helpers';

export default class UserService {
  private userDAL: UserDAL;

  constructor(userDAL: UserDAL) {
      this.userDAL = userDAL;
  }

  getAllUsers(): Promise<User[]> {
      return this.userDAL.getAllUsers();
  }

  getUserById(id: string): Promise<User | null> {
      return this.userDAL.getUserById(id);
  }

  async getAutoSuggestUsers(
      limit: number,
      loginSubstring: string
  ): Promise<User[]> {
      const allUsers = await this.userDAL.getAllUsers();
      return getAutoSuggest(loginSubstring, limit, allUsers);
  }

  createUser(user: User): Promise<User> {
      return this.userDAL.createUser(createNewUser(user));
  }

  updateUser(user: User, id: string): Promise<User[] | number> {
      return this.userDAL.updateUser(user, id);
  }

  deleteUser(id: string): Promise<number> {
      return this.userDAL.deleteUser(id);
  }

  addUsersToGroup(
      userIds: Array<string>,
      groupId: string
  ): Promise<UserGroup | void> {
      return this.userDAL.addUsersToGroup(userIds, groupId);
  }

  async loginUser(login: string, password: string): Promise<string | undefined> {
      let token;
      let match;
      const user = await this.userDAL.getUserByLogin(login);

      if (!user) {
          throw Error("We haven't user with the this login");
      } else {
          match =  await bcrypt.compare(password, user.password);
      }

      if (match) {
          const payload = { sub: user.id };
          token = jwt.sign(payload, config.privateJwtKey, {
              algorithm: 'HS256',
              expiresIn: config.expirationToken
          });
      } else {
          throw Error('Wrong password');
      }
      return token;
  }
}
