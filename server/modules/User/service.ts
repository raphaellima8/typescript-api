import {IUser, createUser, createUsers, createUserById, IUserDetail} from './interface';
var models  = require('../../models');
import * as Bluebird from 'bluebird';

export class User implements IUser{
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(){}

  create(user: any) {
    return models.User.create(user);
  }

  getAll(): Bluebird<IUser[]> {
    return models.User.findAll({
      order: ['name']
    })
    .then(createUsers);
  }

  getById(id:number): Bluebird<IUserDetail> {
    return models.User.findOne({
      where: {id}
    })
    .then(createUserById);
  }

  update(id: number, user: any) {
    return models.User.update(
      user,
      {
        where: {id}
      }
    )
  }

  delete(id: number) {
    return models.User.destroy({
      where: {id}
    });
  }
}
