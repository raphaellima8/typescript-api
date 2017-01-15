import {UserModel} from '../model/model';
import {User, createUser} from '../shared/model/createUser';
import * as Bluebird from 'bluebird';

export function getAllUsers(): Bluebird<User[]> {
  return UserModel.findAll({
    order: ['name']
  })
  .then(createUser)
}
