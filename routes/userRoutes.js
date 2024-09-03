import { Router } from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';
import { userValidator, userIdValidator } from '../middleware/userValidate.js';
import { validateToken, adminOnly } from '../middleware/protect.js'; 

export const router = Router();

router.post('/',validateToken, adminOnly, userValidator, createUser); //  create a user
router.put('/:id', validateToken, adminOnly,userIdValidator, userValidator, updateUser); //update the user
router.delete('/:id',validateToken, adminOnly, userIdValidator, deleteUser); // delete the user.
router.get('/list',validateToken, listUsers); //list all the users
router.get('/list/:id',validateToken, userIdValidator, getUserById); // user get by ID 




export default router;
