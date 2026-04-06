const pool = require('../config/db');

const addTaskToPlan = async (userId, taskId, planDate, position) => {
    const result = await pool.query(
        `INSERT INTO daily_plans (user_id, task_id, plan_date, position)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (task_id, plan_date) DO NOTHING
        RETURNING *`,
        [userId, taskId, planDate, position || 0]
    );
    return result.rows[0];
};

const getPlanByDate = async (userId, planDate) => {
    const result = await pool.query(
        `SELECT daily_plans.*, tasks.title, tasks.priority, tasks.status,
            categories.name AS category_name, categories.color AS category_color
        FROM daily_plans
        JOIN tasks ON daily_plans.task_id = tasks.id
        LEFT JOIN categories ON tasks.category_id = categories.id
        WHERE daily_plans.user_id = $1 AND daily_plans.plan_date = $2
        ORDER BY daily_plans.position ASC`,
        [userId, planDate]
    );
    return result.rows;
};

const removeTaskFromPlan = async (userId, taskId, planDate) => {
    const result = await pool.query(
        `DELETE FROM daily_plans
        WHERE user_id = $1 AND task_id = $2 AND plan_date = $3
        RETURNING *`,
        [userId, taskId, planDate]
    );
    return result.rows[0];
};

module.exports = { addTaskToPlan, getPlanByDate, removeTaskFromPlan };