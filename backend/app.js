const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require("./routes/taskRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth',authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habits", habitRoutes);

module.exports = app;