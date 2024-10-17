const express = require('express');
const TodoModel = require('../Models/Todo');
const authenticateToken = require('../Middleware/auth');
const router = express.Router();

router.get('/get-tasks', authenticateToken, async (req, res) => {
    try {
        const todos = await TodoModel.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks', details: error.message });
    }
});


router.post('/add-task', authenticateToken, async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = new TodoModel({
            task,
            user: req.user.id
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', details: error.message });
    }
});

router.put('/update-task-status/:id', authenticateToken, async (req, res) => {
    try {
        console.log("id", req.params.id)
        console.log("user", req.user.id)
        const todo = await TodoModel.findOne({ _id: req.params.id, user: req.user.id });

        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task status', details: error.message });
    }
});

router.put('/update-task/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { task }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task', details: error.message });
    }
});

router.delete('/delete-task/:id', authenticateToken, async (req, res) => {
    try {
        const todo = await TodoModel.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', details: error.message });
    }
});

module.exports = router;
