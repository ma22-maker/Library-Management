import { body, param, validationResult } from 'express-validator';
import Genre from '../model/genre.js';

// Common error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create Genre Validator
export const createGenreValidator = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required')
    .custom(async (value) => {
      const genre = await Genre.findOne({ name: value });
      if (genre) {
        throw new Error('Genre name already exists');
      }
    }),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('image').optional().isURL().withMessage('Image URL must be a valid URL'),
  handleValidationErrors,
];

// Update Genre Validator
export const updateGenreValidator = [
  param('id').isMongoId().withMessage('Valid genre ID is required'),
  body('name')
    .optional()
    .isString()
    .custom(async (value, { req }) => {
      const genre = await Genre.findOne({ name: value, _id: { $ne: req.params.id } });
      if (genre) {
        throw new Error('Genre name already exists');
      }
    }),
  body('description').optional().isString(),
  body('image').optional().isURL().withMessage('Image URL must be a valid URL'),
  handleValidationErrors,
];

// Delete Genre Validator
export const deleteGenreValidator = [
  param('id').isMongoId().withMessage('Valid genre ID is required'),
  handleValidationErrors,
];
