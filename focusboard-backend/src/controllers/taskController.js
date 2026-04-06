const { createTask, getTasksByUser, getTaskById, updateTask, deleteTask } = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksByUser(req.user.id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await getTaskById(req.params.id, req.user.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });
        const task = await createTask(req.user.id, req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const editTask = async (req, res) => {
    try {
        const task = await updateTask(req.params.id, req.user.id, req.body);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const removeTask = async (req, res) => {
    try {
        const deleted = await deleteTask(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, getTask, addTask, editTask, removeTask };
