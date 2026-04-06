const pool = require('../config/db');

const createTask = async (userId, { title, description, priority, status, due_date, category_id }) => {
    const result = await pool.query(
        `INSERT INTO tasks (user_id, category_id, title, description, priority, status, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [userId, category_id || null, title, description || null, priority || 'medium', status || 'todo', due_date || null]
    );
    return result.rows[0];
};

const getTasksByUser = async (userId) => {
    const result = await pool.query(
        `SELECT tasks.*, categories.name AS category_name, categories.color AS category_color
        FROM tasks
        LEFT JOIN categories ON tasks.category_id = categories.id
        WHERE tasks.user_id = $1
        ORDER BY tasks.created_at DESC`,
        [userId]
    );
    return result.rows;
};

const getTaskById = async (id, userId) => {
    const result = await pool.query(
        `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
        [id, userId]
    );
    return result.rows[0];
};

const updateTask = async (id, userId, fields) => {
    const { title, description, priority, status, due_date, category_id } = fields;
    const result = await pool.query(
        `UPDATE tasks
        SET title = COALESCE($1, title),
            description = COALESCE($2, description),
            priority = COALESCE($3, priority),
            status = COALESCE($4, status),
            due_date = COALESCE($5, due_date),
            category_id = COALESCE($6, category_id)
        WHERE id = $7 AND user_id = $8
        RETURNING *`,
        [title, description, priority, status, due_date, category_id, id, userId]
    );
    return result.rows[0];
};

const deleteTask = async (id, userId) => {
    const result = await pool.query(
        `DELET FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, userId]
    );
    return result.rows[0];
};

module.exports = { createTask, getTasksByUser, getTaskById, updateTask, deleteTask };