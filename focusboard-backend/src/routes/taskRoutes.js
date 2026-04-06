const express = require('express');
const router = express.Router();
const { getTasks, getTask, addTask, editTask, removeTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { taskValidator, updateTaskValidator } =  require('../validators/taskValidator.');
const validate = require('../middleware/validate');

router.use(protect);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', taskValidator, validate, addTask);
router.put('/:id', updateTaskValidator, validate, editTask);
router.delete('/:id', removeTask);

module.exports = router;