import {Application} from 'express';
import {UserRoutes} from '../routes/user';

export function initApi(app: Application) {
  UserRoutes(app);
}
