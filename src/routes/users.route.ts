import express from 'express';
import User from '../controllers/users.controller';

const router = express.Router();
const user = new User();

router.get('/', user.getUsers);
router.get('/:id', user.getUser);
router.post('/', user.postUser);
router.patch('/:id', user.patchUser);
router.delete('/:id', user.deleteUser);

export default router;
