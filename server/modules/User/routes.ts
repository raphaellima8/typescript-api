import {getAll, getById} from './controller';
import {Router} from 'express';

let router: Router;
router = Router();

router.route('/all').get(getAll);
router.route('/:id').get(getById);

export default router;
