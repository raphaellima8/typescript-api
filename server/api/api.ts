import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import userRoutes from '../modules/User/routes';
const bodyParser = require('body-parser');

class Api {

  public express: express.Application;

  constructor(){
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
  }

  private routes(): void {
    this.express.use('/api/users', userRoutes);
  }

}

export default new Api().express;
