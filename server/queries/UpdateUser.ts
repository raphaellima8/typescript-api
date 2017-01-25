import {UserModel} from '../model/model';

export function userUpdate(id: number, user: any) {
  return UserModel.update(
    user,
    {
      where: {id}
    }
  );
};
