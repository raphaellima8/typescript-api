import {IUser, createUser, createUsers, createUserById, IUserDetail} from './interface';
import {UserModel} from '../../model/model';
import * as Bluebird from 'bluebird';


export class User implements IUser{
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(){}

  create(user: any) {
    return UserModel.create(user);
  }

  getAll(): Bluebird<IUser[]> {
    return UserModel.findAll({
      order: ['name']
    })
    .then(createUsers);
  }

  getById(id:number): Bluebird<IUserDetail> {
    return UserModel.findOne({
      where: {id}
    })
    .then(createUserById);
  }

  update(id: number, user: any) {
    return UserModel.update(
      user,
      {
        where: {id}
      }
    )
  }

  delete(id: number) {
    return UserModel.destroy({
      where: {id}
    });
  }
}
