import { body, param, query, validationResult } from 'express-validator';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Create Book Validator
export const createBookValidator = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('genre').isMongoId().withMessage('Valid genre ID is required'),
  body('author').isMongoId().withMessage('Valid author ID is required'),
  body('publishedDate')
    .matches(dateRegex)
    .withMessage('Published Date must be in YYYY-MM-DD format'),
  body('coverImage').optional().isURL().withMessage('Cover Image URL must be a valid URL'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer and at least 1'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Update Book Validator
export const updateBookValidator = [
  param('id').isMongoId().withMessage('Valid book ID is required'),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('genre').optional().isMongoId().withMessage('Valid genre ID is required'),
  body('author').optional().isMongoId().withMessage('Valid author ID is required'),
  body('publishedDate')
    .optional()
    .matches(dateRegex)
    .withMessage('Published Date must be in YYYY-MM-DD format'),
  body('coverImage').optional().isURL().withMessage('Cover Image URL must be a valid URL'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer and at least 1'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Delete Book Validator
export const deleteBookValidator = [
  param('id').isMongoId().withMessage('Valid book ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Get Book By ID Validator
export const getBookByIdValidator = [
  param('id').isMongoId().withMessage('Valid book ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// List Books Validator
export const listBooksValidator = [
  query('page')
    .exists()
    .withMessage('Page is required')
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .exists()
    .withMessage('Limit is required')
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  
  query('genre')
    .optional()
    .isMongoId()
    .withMessage('Valid genre ID is required'),
  
  query('author')
    .optional()
    .isMongoId()
    .withMessage('Valid author ID is required'),
  
  query('q')
    .optional()
    .isString()
    .withMessage('Search query must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
