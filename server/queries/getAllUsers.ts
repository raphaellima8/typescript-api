import {UserModel} from '../model/model';
import {User, createUser, createUsers} from '../shared/model/createUser';
import * as Bluebird from 'bluebird';

export function getAllUsers(): Bluebird<User[]> {
  return UserModel.findAll({
    order: ['name']
  })
  .then(createUsers)
}
