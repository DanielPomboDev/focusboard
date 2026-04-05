const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

const protect = async (req, res, next) => {
    try {
        // 1. Check for token headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, access denied' });
        }

        // 2. Extract and verify token
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request object
        const user = await findUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not longer exists' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { protect };