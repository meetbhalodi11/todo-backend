const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth');
const todoRoutes = require('./Routes/todo');

dotenv.config();
const app = express();

const corsOptions = {
    origin: '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Auth Routes
app.use('/api/auth', authRoutes);

// CRUD Routes
app.use('/api', todoRoutes);

app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Server running at ${process.env.SERVER_PORT}`)
})
