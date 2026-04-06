const express = require('express');
const router = express.Router();
const {
    breakdownGoal,
    prioritizeTasks,
    generateDailyPlan,
    parseNaturalLanguage,
    getProductivityInsights
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const {
    breakdownValidator,
    planValidator,
    naturalLanguageValidator
} = require('../validators/aiValidator');
const validate = require('../middleware/validate');

router.use(protect);

router.post('/breakdown', breakdownValidator, validate, breakdownGoal);
router.get('/prioritize', prioritizeTasks);
router.post('/plan', planValidator, validate, generateDailyPlan);
router.post('/parse-task', naturalLanguageValidator, validate, parseNaturalLanguage);
router.get('/insights', getProductivityInsights);

module.exports = router;