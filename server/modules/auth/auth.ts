import {Request, Response} from 'express';
import * as _ from 'lodash';
import {User} from '../User/service';
import {authSuccess, authFail} from '../../api/responses/authSuccess';
const UserService = new User();
export function auth(req: Request, res: Response){

  if (req.body.email && req.body.password) {
      const creadentials = {
            email: req.body.email,
            password: req.body.password
          };
      UserService.getById(creadentials.email)
        .then(_.partial(authSuccess, res, creadentials))
        .catch(_.partial(authFail, req, res));
    }
}
