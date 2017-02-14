import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import AuthConfig from '../auth';
import Routes from './routes/routes';

const bodyParser = require('body-parser');

class Api {

  public express: express.Application;
  public auth;
  
  constructor(){
    this.express = express();
    this.auth = new AuthConfig();
    this.middleware();
    this.router(this.express, this.auth);
  }

  middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(this.auth.initialize());
  }

  private router(app: express.Application, auth: any): void {
    new Routes(app, auth);
  }
}

export default new Api().express;
