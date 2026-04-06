const rateLimit = require('express-rate-limit');

// General API limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                // max 100 requests per IP per 15 min
    message: { message: 'Too many requests, please try again later.' },
});

// Stricter limit for auth routes only
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: 10,                // max 10 requests per IP per 15 min
    message: { message: 'Too many auth attempts, please try again later.' },
});

module.exports = { apiLimiter, authLimiter };