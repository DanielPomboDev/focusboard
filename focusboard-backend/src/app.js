const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('./config/db');

const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'FocusBoard API is running' });
});

app.use('/api/auth', authRoutes);

module.exports = app;