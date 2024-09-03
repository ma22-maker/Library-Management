import { body, validationResult } from 'express-validator';

// Register user validation rules
export const validateRegisterUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[0-9]/).withMessage('Password must contain a number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain a letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Authenticate user validation rules
export const validateAuthUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
