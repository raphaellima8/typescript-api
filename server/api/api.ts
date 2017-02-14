import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import authConfig from '../auth';
import Routes from './routes/routes';

const bodyParser = require('body-parser');

class Api {

  public express: express.Application;
  public auth;
  
  constructor(){
    this.express = express();
    this.middleware();
    this.router(this.express);
  }

  middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.auth = authConfig();
    this.express.use(this.auth.initialize());
  }

  private router(app: express.Application): void {
    new Routes(app);
  }
}

export default new Api().express;
