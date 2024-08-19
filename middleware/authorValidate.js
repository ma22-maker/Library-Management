import { body, param, validationResult } from 'express-validator';
import Author from '../model/author.js';

// Create Author Validator
export const createAuthorValidator = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required')
    .custom(async (value) => {
      const author = await Author.findOne({ name: value });
      if (author) {
        throw new Error('Author name already exists');
      }
    }),
  body('biography').optional().isString(),
  body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Update Author Validator
export const updateAuthorValidator = [
  param('id').isMongoId().withMessage('Valid author ID is required'),
  body('name')
    .optional()
    .isString()
    .custom(async (value, { req }) => {
      const author = await Author.findOne({ name: value, _id: { $ne: req.params.id } });
      if (author) {
        throw new Error('Author name already exists');
      }
    }),
  body('biography').optional().isString(),
  body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Delete Author Validator
export const deleteAuthorValidator = [
  param('id').isMongoId().withMessage('Valid author ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
