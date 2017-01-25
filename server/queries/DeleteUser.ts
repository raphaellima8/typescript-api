import {UserModel} from '../model/model';

export function userDelete(id: number) {
  return UserModel.destroy({
    where: {id}
  });
}
