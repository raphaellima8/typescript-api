import {getAll, getById, createUser} from './controller';
import {Router} from 'express';

let router: Router;
router = Router();

router.route('/all').get(getAll);
router.route('/:id').get(getById);
router.route('/create').post(createUser);

export default router;
