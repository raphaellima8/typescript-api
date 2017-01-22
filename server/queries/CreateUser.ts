import {UserModel} from '../model/model';

export function createNewUser(user: any) {
  return UserModel.create(user);
}
