import { body, param, query, validationResult } from "express-validator";

// Regular expression for YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Validator for renting a book
export const rentBookValidator = [
  body("userId").isMongoId().withMessage("Valid user ID is required"),
  body("bookId").isMongoId().withMessage("Valid book ID is required"),
  body("rentedDate")
    .optional()
    .matches(dateRegex)
    .withMessage("Rented Date must be in YYYY-MM-DD format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for giving back a book
export const giveBackBookValidator = [
  body("userId").isMongoId().withMessage("Valid user ID is required"),
  body("bookId").isMongoId().withMessage("Valid book ID is required"),
  body("returnDate")
    .optional()
    .matches(dateRegex)
    .withMessage("Return Date must be in YYYY-MM-DD format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for getting user history
export const getUserHistoryValidator = [
  param("userId").isMongoId().withMessage("Valid user ID is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
