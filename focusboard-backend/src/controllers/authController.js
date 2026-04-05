const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserById } = require('../models/userModel');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All field are required' });
        }

        // 2. Check if email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Save user to DB
        const user = await createUser(name, email, hashedPassword);

        // 5. Return token
        const token = generateToken(user.id);
        res.status(201).json({ user, token });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // 2. Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Compare password with hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 4. Return token
        const token = generateToken(user.id);
        res.json({
            user: { id: user.id, name: user.name, email: user.email },
            token
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };