import {getAll, getById, createUser, updateUser, deleteUser} from './controller';
import {Request, Response} from 'express';

export default class UserRoutes {

  constructor(){}

  index(req:Request, res:Response) {
    return getAll(req, res);
  }

  create(req:Request, res:Response) {
    return createUser(req, res);
  }

  findOne(req:Request, res:Response) {
    return getById(req, res);
  }

  update(req:Request, res:Response) {
    return updateUser(req, res);
  }

  destroy(req:Request, res:Response){
    return deleteUser(req, res);
  }
}
