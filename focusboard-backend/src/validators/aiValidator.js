const { body } = require('express-validator');

const breakdownValidator = [
    body('goal')
        .trim()
        .notEmpty().withMessage('Goal is required')
        .isLength({ min: 5 }).withMessage('Goal must be at least 5 characters long')
        .isLength({ max: 500 }).withMessage('Goal must be under 500 characters'),
];

const planValidator = [
    body('date')
        .notEmpty().withMessage('Date is required')
        .isDate().withMessage('Date must be valid (YYYY-MM-DD)'),
];

const naturalLanguageValidator = [
  body('input')
    .trim()
    .notEmpty().withMessage('Input is required')
    .isLength({ min: 3 }).withMessage('Input must be at least 3 characters')
    .isLength({ max: 500 }).withMessage('Input must be under 500 characters'),
];

module.exports = { breakdownValidator, planValidator, naturalLanguageValidator };