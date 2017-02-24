import {Request, Response} from 'express';
import * as _ from 'lodash';
import {User} from '../User/service';
import {authSuccess, authFail} from '../../api/responses/authSuccess';
const UserService = new User();

class TokenRoutes {

    auth(req: Request, res: Response){
        if (req.body.email && req.body.password) {
            const credentials = {
                    email: req.body.email,
                    password: req.body.password
                };

            UserService.getByEmail(credentials.email)
                .then(_.partial(authSuccess, res, credentials))
                .catch(_.partial(authFail, req, res));
        }
    }
}

export default TokenRoutes;
