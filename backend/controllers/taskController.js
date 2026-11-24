
const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,

            // Get the logged-in user's ID from JWT middleware
            user: req.user.id
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                title,
                description,
                priority,
                dueDate,
                status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};


// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};

// get task
const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
};


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask
};
