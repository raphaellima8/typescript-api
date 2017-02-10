import {Request, Response} from 'express';
import * as jwt from 'jwt-simple';
const config = require('../../config/env/config')();
const bcrypt = require('bcrypt');

export function authSuccess(res: Response, creadentials:any, data: any){
    if(bcrypt.compareSync(creadentials.password, data.password)){
      const payload = {id: data.id};
      res.json({
        token: jwt.encode(payload, config.secret)
      });
    } else {
      res.sendStatus(401);
    }
}

export function authFail(req: Request, res: Response){
  res.sendStatus(401);
}
