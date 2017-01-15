import {Request, Response} from 'express';
import * as _ from 'lodash';
import {onError} from '../api/responses/errorHandler';
import {onSuccess} from '../api/responses/successHandler';
import {getAllUsers} from '../queries/getAllUsers';

export function getAll(req: Request, res: Response) {}

export function getById(id:number) {}

export function updateUser(id:string, props:any){}

export function deleteUser(id:string){}
