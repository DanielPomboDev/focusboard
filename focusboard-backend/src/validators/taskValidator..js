const { body } = require('express-validator');

const taskValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title must be under 255 characters'),
    
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Priority mus be low, medium, or high'),
    
    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done']).withMessage('Status must be todo, in progress, or done'),
    
    body('due_date')
        .optional()
        .isDate().withMessage('Due date must be a valid date (YYYY-MM-DD)'),
];

const updateTaskValidator = [
     body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title must be under 255 characters'),
    
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Priority mus be low, medium, or high'),
    
    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done']).withMessage('Status must be todo, in progress, or done'),
    
    body('due_date')
        .optional()
        .isDate().withMessage('Due date must be a valid date (YYYY-MM-DD)'),
];

module.exports = { taskValidator, updateTaskValidator };