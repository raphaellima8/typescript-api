import {Request, Response} from 'express';
import * as _ from 'lodash';
import {onError} from '../../api/responses/errorHandler';
import {onSuccess} from '../../api/responses/successHandler';
import {getAllUsers} from '../../queries/getAllUsers';
import {getUserById} from '../../queries/getUserById';
import {createNewUser} from '../../queries/CreateUser';
import {userUpdate} from '../../queries/UpdateUser';
import {userDelete} from '../../queries/DeleteUser';
import {dbErrorHandler} from '../../../config/dbErrorHandler';
import {User} from './service';
const srv = new User();

export function getAll(req: Request, res: Response) {
  srv.getAll()
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'Find all users failed'));
}

export function createUser(req: Request, res: Response) {
  srv.create(req.body)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(dbErrorHandler, res))
    .catch(_.partial(onError, res, `Could not create user`));
}

export function getById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  console.log(userId);
  srv.getById(userId)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'Not found'));
}

export function updateUser(req: Request, res: Response){
  const userId = parseInt(req.params.id);
  const props = req.body;
  srv.update(userId, props)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'Update User failed'));
}

export function deleteUser(req: Request, res: Response){
  const userId = req.params.id;
  srv.delete(userId)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'An error ocurred to delete an User'));
}
