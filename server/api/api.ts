import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import UserRoutes from '../modules/User/routes';
import tokenRoute from '../modules/auth/routes';
import authConfig from '../auth';

const bodyParser = require('body-parser');

class Api {

  public express: express.Application;
  public auth;
  public router: UserRoutes;

  constructor(){
    this.express = express();
    this.middleware();
    this.router = new UserRoutes();
    this.routes();
  }

  middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.auth = authConfig();
    this.express.use(this.auth.initialize());
  }

  private routes(): void {
    this.express.route('/api/users/all').get(this.router.index);
    this.express.route('/api/users/create').post(this.router.create);
    this.express.route('/api/users/:id').get(this.router.findOne);
    this.express.route('/api/users/:id/update').put(this.router.update);
    this.express.route('/api/users/:id/destroy').delete(this.router.destroy);
    this.express.use('/token', tokenRoute(this.auth));
  }

}

export default new Api().express;
