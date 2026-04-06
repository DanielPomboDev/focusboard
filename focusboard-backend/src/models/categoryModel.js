const pool = require('../config/db');

const createCategory = async (userId, name, color) => {
    const result = await pool.query(
        `INSERT INTO categories (user_id, name, color)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [userId, name, color]
    );
    return result.rows[0];
};

const getCategoriesByUser = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM categories WHERE user_id = $1`,
        [userId]
    );
    return result.rows;
};

const deleteCategory = async (id, userId) => {
    const result = await pool.query(
        `DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, userId]
    );
    return result.rows[0];
};

module.exports = { createCategory, getCategoriesByUser, deleteCategory };