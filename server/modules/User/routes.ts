import UserController from './controller';
import {Request, Response} from 'express';
let UserCtlr;

export default class UserRoutes {

  constructor(){
    UserCtlr = new UserController();
  }

  index(req:Request, res:Response) {
    return UserCtlr.getAll(req, res);
  }

  create(req:Request, res:Response) {
    return UserCtlr.createUser(req, res);
  }

  findOne(req:Request, res:Response) {
    return UserCtlr.getById(req, res);
  }

  update(req:Request, res:Response) {
    return UserCtlr.updateUser(req, res);
  }

  destroy(req:Request, res:Response){
    return UserCtlr.deleteUser(req, res);
  }
}
