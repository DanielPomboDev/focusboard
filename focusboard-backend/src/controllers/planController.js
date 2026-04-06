const { addTaskToPlan, getPlanByDate, removeTaskFromPlan } = require('../models/planModel');

const getDailyPlan = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ message: 'date query param is required (?date=YYYY-MM-DD)' });
        const plan = await getPlanByDate(req.user.id, date);
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const scheduleTask = async (req, res) => {
    try {
        const { task_id, plan_date, position } = req.body;
        if (!task_id || !plan_date) return res.status(400).json({ message: 'task_id and pland_date are required' });
        const plan = await addTaskToPlan(req.user.id, task_id, plan_date, position);
        if (!plan) return res.status(409).json({ message: 'Task already scheduled for this date' });
        res.status(201).json(plan);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const unscheduleTask = async (req, res) => {
    try {
        const { task_id, plan_date } = req.body;
        const removed = await removeTaskFromPlan(req.user.id, task_id, plan_date);
        if (!removed) return res.status(404).json({ message: 'Plan entry not found' });
        res.json({ message: 'Task remove from plan' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getDailyPlan, scheduleTask, unscheduleTask };