require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://task-time-tracking-app.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/timelogs', require('./routes/timeLogRoutes'));

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
