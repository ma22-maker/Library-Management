import express from 'express';
import { registerUser, authUser, promoteToAdmin, refreshAccessToken } from '../controller/authController.js';
import { validateRegisterUser, validateAuthUser } from '../middleware/authValidate.js';
import { adminOnly, validateToken } from '../middleware/protect.js';

export const router = express.Router();

router.post('/register', validateRegisterUser, registerUser); // For normal users
router.post('/login', validateAuthUser, authUser); // For normal users
router.put('/promote/:userId', validateToken, adminOnly, promoteToAdmin); // To make a normal user an admin
router.post('/refresh-token', refreshAccessToken); // Endpoint to refresh access token


