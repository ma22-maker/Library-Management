import { body, param } from 'express-validator';
import User from '../model/user.js';

// Validator for creating and updating users
export const userValidator = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email')
        .isEmail().withMessage('Valid email is required')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already in use');
            }
            return true;
        }),
    body('role').isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
    body('plan').isIn(['Bookworm', 'Commonworm']).withMessage('Plan must be either Bookworm or Commonworm')
];

// Validator for user ID in params
export const userIdValidator = [
    param('id').isMongoId().withMessage('Valid user ID is required')
];


