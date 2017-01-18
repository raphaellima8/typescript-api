import {getAll} from './controller';
import {Router} from 'express';

let router: Router;
router = Router();

router.route('/').get(getAll);

export default router;
