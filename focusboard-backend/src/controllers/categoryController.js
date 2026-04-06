const { createCategory, getCategoriesByUser, deleteCategory } = require('../models/categoryModel');

const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesByUser(req.user.id);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });
        const category = await createCategory(req.user.id, name, color || '#6366f1');
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const removeCategory = async (req, res) => {
    try {
        const deleted = await deleteCategory(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCategories, addCategory, removeCategory };