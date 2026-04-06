const express = require('express');
const router = express.Router();
const { getCategories, addCategory, removeCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getCategories);
router.post('/', addCategory);
router.delete('/:id', removeCategory);

module.exports = router;