import * as Bluebird from 'bluebird';
import {UserModel} from '../model/model';
import {UserDetail} from '../shared/model/UserDetails';
import {createUserById} from '../shared/model/UserById';

export function getUserByEmail(email: string): Bluebird<UserDetail>{
  return UserModel.findOne({
    where: {email}
  }).then(createUserById);
}
