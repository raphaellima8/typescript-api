import {Request, Response} from 'express';
import * as _ from 'lodash';
import {getUserByEmail} from '../../queries/getUserByEmail';
import {authSuccess, authFail} from '../../api/responses/authSuccess';

export function auth(req: Request, res: Response){

  if (req.body.email && req.body.password) {
      const creadentials = {
            email: req.body.email,
            password: req.body.password
          };
      getUserByEmail(creadentials.email)
        .then(_.partial(authSuccess, res, creadentials))
        .catch(_.partial(authFail, req, res));
    }
}
