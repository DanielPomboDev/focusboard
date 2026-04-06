const { chat } = require('../ai/qwenClient');
const {
    taskBreakdownPrompt,
    autoPrioritizPrompt,
    dailyPlanPrompt,
    naturalLanguagePrompt,
    productivityInsightsPrompt,
    autoPrioritizePrompt
} = require('../ai/prompts');
const { getTasksByUser } = require('../models/taskModel');

// POST /api/ai/breakdown
const breakdownGoal = async (req, res) => {
    try {
        const { goal } = req.body;
        const prompt = taskBreakdownPrompt(goal);
        const result = await chat(prompt);
        const tasks = JSON.parse(result);
        res.json({ tasks }); 
    } catch (err) {
        console.error('AI breakdown error', err.message);
        res.status(500).json({ message: 'AI failed to break down goal' });
    }
};

// GET /api/ai/prioritize
const prioritizeTasks = async (req, res) => {
    try {
        const tasks = await getTasksByUser(req.user.id);
        const activeTasks = tasks.filter(t => t.status !== 'done');

        if (activeTasks.length === 0) {
            return res.json({ suggestions: [], message: 'No active tasks to prioritze' });
        }

        const prompt = autoPrioritizePrompt(activeTasks);
        const result = await chat(prompt);
        const suggestions = JSON.parse(result);

        // Attach full task details to each suggestion
        const enriched = suggestions.map(s => ({
            ...s,
            task: tasks.find(t => t.id === s.task_id)
        }));

        res.json({ suggestions: enriched });
    } catch (err) {
        console.error('AI prioritized error:', err.message);
        res.status(500).json({ message: 'AI failed to prioritize tasks' });
    }
};

// POST /api/ai/plan
const generateDailyPlan = async (req, res) => {
    try {
        const { date } = req.body;
        const tasks = await getTasksByUser(req.user.id);
        const activeTasks =  tasks.filter(t => t.status !== 'done');

        if (activeTasks.length === 0) {
            return res.json({ suggestions: [], message: 'No active tasks to plan' });
        }

        const prompt = dailyPlanPrompt(activeTasks, date);
        const result = await chat(prompt);
        const plan = JSON.parse(result);

        // Attach full task details
        const enriched = plan.map(p => ({
            ...p,
            task: tasks.find(t => t.id === p.task_id)
        }));

        res.json({ date, plan: enriched });
    } catch (err) {
        console.error('AI plan error:', err.message);
        res.status(500).json({ message: 'AI failed to generate daily plan' });
    }
};

// POST /api/ai/parse-task
const parseNaturalLanguage = async (req, res) => {
    try {
        const { input } = req.body;
        const prompt = naturalLanguagePrompt(input);
        const result = await chat(prompt);
        const task = JSON.parse(result);
        res.json({ task });
    } catch (err) {
        console.error('AI parse error:', err.message);
        res.status(500).json({ message: 'AI failed to parse input' }); 
    }
};

// GET /api/ai/insights
const getProductivityInsights = async (req, res) => {
    try {
        const tasks = await getTasksByUser(req.user.id);

        const completed = tasks.filter(t => t.status === 'done');
        const pending = tasks.filter(t => t.status !== 'done');

        if (tasks.length === 0) {
            return res.json({ suggestions: [], message: 'No active tasks to prioritze' });
        }

        const prompt = productivityInsightsPrompt(completed, pending);
        const result = await chat(prompt);
        const insights = JSON.parse(result);

        res.json({ insights });
    } catch (err) {
        console.error('AI insights error:', err.message);
        res.status(500).json({ message: 'AI failed to generate insights' });
    }
};

module.exports = {
    breakdownGoal,
    prioritizeTasks,
    generateDailyPlan,
    parseNaturalLanguage,
    getProductivityInsights
};