const Habit = require("../models/Habit");

// CREATE HABIT
const createHabit = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;

        const habit = await Habit.create({
            title,
            description,
            frequency,
            user: req.user.id
        });

        res.status(201).json({
            message: "Habit created successfully",
            habit
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create habit",
            error: error.message
        });
    }
};


// GET ALL HABITS
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({
            user: req.user.id
        });

        res.status(200).json({
            message: "Habits fetched successfully",
            habits
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch habits",
            error: error.message
        });
    }
};


// UPDATE HABIT
const updateHabit = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;

        const habit = await Habit.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                title,
                description,
                frequency
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        res.status(200).json({
            message: "Habit updated successfully",
            habit
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update habit",
            error: error.message
        });
    }
};


// DELETE HABIT
const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        res.status(200).json({
            message: "Habit deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete habit",
            error: error.message
        });
    }
};


// CALCULATE HABIT STREAK
const calculateStreak = (completedDates) => {
    const dates = [...completedDates].sort().reverse();

    const today = new Date().toLocaleDateString("en-CA");

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString("en-CA");

    let streak = 0;
    let currentDate = today;

    if (!dates.includes(today)) {
        if (dates.includes(yesterday)) {
            currentDate = yesterday;
        } else {
            return 0;
        }
    }

    while (dates.includes(currentDate)) {
        streak++;

        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - 1);
        currentDate = previousDate.toLocaleDateString("en-CA");
    }

    return streak;
};


// TOGGLE HABIT COMPLETION
const toggleHabitCompletion = async (req, res) => {
    try {
        const { date } = req.body;

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                message: "A valid date in YYYY-MM-DD format is required"
            });
        }

        const habit = await Habit.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        if (habit.completedDates.includes(date)) {
            habit.completedDates = habit.completedDates.filter(
                (completedDate) => completedDate !== date
            );
        } else {
            habit.completedDates.push(date);
        }

        // Calculate and update the streak
        habit.currentStreak = calculateStreak(habit.completedDates);

        await habit.save();

        res.status(200).json({
            message: "Habit completion updated successfully",
            habit
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update habit completion",
            error: error.message
        });
    }
};

module.exports = {
    createHabit,
    getHabits,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
};