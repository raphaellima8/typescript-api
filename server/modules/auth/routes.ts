import {Router, Application} from 'express';
import {auth} from './auth';

function authRouter(authorization:any) {
  let router: Router;
  router = Router();

  router.route('/').post(auth);
  return router;
}

export default authRouter;
