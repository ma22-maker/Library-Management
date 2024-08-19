import { Router } from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';
import { userValidator, userIdValidator } from '../middleware/userValidate.js';

export const router = Router();

router.post('/', userValidator, createUser);
router.get('/list', listUsers);
router.get('/list/:id', userIdValidator, getUserById);
router.put('/:id', userIdValidator, userValidator, updateUser);
router.delete('/:id', userIdValidator, deleteUser);

export default router;
