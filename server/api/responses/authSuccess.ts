import {Request, Response} from 'express';
import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
const config = require('../../config/env/config')();
const bcrypt = require('bcrypt');

export function authSuccess(res: Response, creadentials:any, data: any){
    const isMatch = bcrypt.compareSync(creadentials.password, data.password);

    if(isMatch){
      const payload = {id: data.id};
      res.json({
        token: jwt.encode(payload, config.secret)
      });
    } else {
      res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
}

export function authFail(req: Request, res: Response){
  res.sendStatus(HTTPStatus.UNAUTHORIZED);
}
