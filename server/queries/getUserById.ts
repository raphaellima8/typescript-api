import * as Bluebird from 'bluebird';
import {UserModel} from '../model/model';
import {UserDetail} from '../shared/model/UserDetails';
import {createUserById} from '../shared/model/UserById';

export function getUserById(id:number): Bluebird<UserDetail> {
  return UserModel.findById(id).then(createUserById);
}
