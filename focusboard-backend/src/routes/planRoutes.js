const express = require('express');
const router = express.Router();
const { getDailyPlan, scheduleTask, unscheduleTask } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getDailyPlan);
router.post('/', scheduleTask);
router.delete('/', unscheduleTask);

module.exports = router;