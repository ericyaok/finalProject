const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

// Validation rules for creating a book
const createBookRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('publishedYear').isInt().withMessage('Published year must be a number'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('copiesAvailable').isInt({ min: 0 }).withMessage('Copies must be a non-negative number')
];

// Validation rules for updating a book
const updateBookRules = [
  param('id').isMongoId().withMessage('Invalid book ID'),
  body('title').optional().notEmpty(),
  body('author').optional().notEmpty(),
  body('genre').optional().notEmpty(),
  body('publishedYear').optional().isInt(),
  body('isbn').optional().notEmpty(),
  body('copiesAvailable').optional().isInt({ min: 0 })
];

// Validation for user registration
const registerUserRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('role').isIn(['student', 'admin']).withMessage('Role must be student or admin'),
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('program').notEmpty().withMessage('Program is required'),
  body('year').isInt({ min: 1 }).withMessage('Year must be a valid number')
];

// Validation for user login
const loginUserRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Validation for updating a user
const updateUserRules = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('fullName').optional().notEmpty(),
  body('role').optional().isIn(['student', 'admin']),
  body('program').optional().notEmpty(),
  body('year').optional().isInt({ min: 1 }),
  body('borrowedBooks').optional().isArray()
];

// Validation for user ID param
const idParamRule = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

const reviewRules = [
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('bookTitle').optional().isString(),
  body('userName').notEmpty().withMessage('User name is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('review').notEmpty().withMessage('Review text is required'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in ISO 8601 format (e.g., 2025-04-17T10:00:00Z)')
];

const transactionRules = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('userName').notEmpty().withMessage('User name is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('bookTitle').notEmpty().withMessage('Book title is required'),
  body('borrowDate')
    .optional()
    .isISO8601()
    .withMessage('Borrow date must be in ISO 8601 format'),
  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be in ISO 8601 format'),
  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be in ISO 8601 format'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Borrowed', 'Returned', 'Overdue'])
    .withMessage('Status must be one of: Borrowed, Returned, Overdue')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};



module.exports = {
  createBookRules,
  updateBookRules,
  idParamRule,
  registerUserRules,
  loginUserRules,
  updateUserRules,
  reviewRules,
  transactionRules,
  validate
};