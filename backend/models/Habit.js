
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        frequency: {
            type: String,
            enum: ["daily", "weekly"],
            default: "daily"
        },

        completedDates: {
            type: [String],
            default: []
        },

        currentStreak: {
            type: Number,
            default: 0
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
