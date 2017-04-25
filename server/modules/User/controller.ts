import {Request, Response} from 'express';
import * as _ from 'lodash';
import {onError} from '../../api/responses/errorHandler';
import {onSuccess} from '../../api/responses/successHandler';
import {dbErrorHandler} from '../../config/dbErrorHandler';
import {User} from './service';

export default class UserController {

  public UserService;

  constructor() {
    this.UserService = new User();
  }

  getAll(req: Request, res: Response) {
    this.UserService.getAll()
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find all users failed'));
  }

  createUser(req: Request, res: Response) {
    this.UserService.create(req.body)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(dbErrorHandler, res))
      .catch(_.partial(onError, res, `Could not create user`));
  }

  getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    this.UserService.getById(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Not found'));
  }

  updateUser(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    const props = req.body;
    this.UserService.update(userId, props)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Update User failed'));
  }

  deleteUser(req: Request, res: Response){
    const userId = req.params.id;
    this.UserService.delete(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'An error ocurred to delete an User'));
  }
}
