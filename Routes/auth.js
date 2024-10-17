const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ message: 'Login successful', token, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});


module.exports = router;
