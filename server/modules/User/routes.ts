import {getAll} from './controller';
import * as express from 'express';

let router: express.Router;
router = express.Router();

router.route('/').get(getAll);

export default router;
