import {Application} from 'express';
import {getAll, getById, updateUser, deleteUser} from '../controller/user.controller';

export function UserRoutes(app: Application) {
  app.route('/api/user').get(getAll);
}
