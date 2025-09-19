import { Request, Response, NextFunction } from 'express';
const { body, param, validationResult } = require('express-validator');

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map((error: any) => ({
        field: error.path || error.param || 'unknown',
        message: error.msg,
        value: error.value
      }))
    });
    return;
  }
  next();
};

// Rest of your validation functions...
export const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('bodyShape')
    .optional()
    .isIn(['rectangle', 'triangle', 'inverted-triangle', 'hourglass', 'oval'])
    .withMessage('Invalid body shape'),
  body('faceStructure')
    .optional()
    .isIn(['oval', 'round', 'square', 'heart', 'diamond', 'long'])
    .withMessage('Invalid face structure'),
  body('preferences.colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array'),
  body('preferences.styles')
    .optional()
    .isArray()
    .withMessage('Styles must be an array'),
  handleValidationErrors
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

export const validateUserUpdate = [
  body('bodyShape')
    .optional()
    .isIn(['rectangle', 'triangle', 'inverted-triangle', 'hourglass', 'oval'])
    .withMessage('Invalid body shape'),
  body('faceStructure')
    .optional()
    .isIn(['oval', 'round', 'square', 'heart', 'diamond', 'long'])
    .withMessage('Invalid face structure'),
  body('preferences.colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array'),
  body('preferences.styles')
    .optional()
    .isArray()
    .withMessage('Styles must be an array'),
  handleValidationErrors
];

export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  handleValidationErrors
];

export const validateClothingUpload = [
  body('name')
    .notEmpty()
    .withMessage('Clothing name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('type')
    .notEmpty()
    .withMessage('Clothing type is required')
    .isIn(['shirt', 'pants', 'dress', 'jacket', 'shoes', 'accessories', 'top', 'bottom', 'outerwear'])
    .withMessage('Invalid clothing type'),
  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Color must be between 2 and 50 characters'),
  body('brand')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Brand name cannot exceed 50 characters'),
  body('size')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'])
    .withMessage('Invalid size'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  handleValidationErrors
];

export const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  handleValidationErrors
];

export const validateClothingId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid clothing ID format'),
  handleValidationErrors
];

export const validateRecommendationRequest = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  handleValidationErrors
];
