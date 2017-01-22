import {Request, Response} from 'express';
import * as _ from 'lodash';
import {onError} from '../../api/responses/errorHandler';
import {onSuccess} from '../../api/responses/successHandler';
import {getAllUsers} from '../../queries/getAllUsers';
import {getUserById} from '../../queries/getUserById';
import {createNewUser} from '../../queries/CreateUser';
import {dbErrorHandler} from '../../../config/dbErrorHandler';

export function getAll(req: Request, res: Response) {
  getAllUsers()
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'Find all users Failed'));
}

export function createUser(req: Request, res: Response) {
  createNewUser(req.body)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(dbErrorHandler, res))
    .catch(_.partial(onError, res, `Could not create user`));
}

export function getById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  getUserById(userId)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, 'Not found'));
}

export function updateUser(id:string, props:any){

}

export function deleteUser(id:string){}
