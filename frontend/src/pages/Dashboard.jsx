import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTasks(response.data.tasks);

            } catch (error) {
                console.log("Error fetching dashboard tasks:", error);
            }
        };

        const getHabits = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("/api/habits", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setHabits(response.data.habits);

            } catch (error) {
                console.log("Error fetching dashboard habits:", error);
            }
        };

        getTasks();
        getHabits();
    }, []);

    // TASK STATS
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);


    // HABIT STATS
    const totalHabits = habits.length;

    const bestStreak = habits.length > 0
        ? Math.max(...habits.map((habit) => habit.currentStreak || 0))
        : 0;

    const today = new Date().toLocaleDateString("en-CA");

    const completedToday = habits.filter(
        (habit) => habit.completedDates?.includes(today)
    ).length;


    return (
        <div className="dashboard">

            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Here's an overview of your productivity.</p>
                </div>

                <div className="user-avatar">U</div>
            </div>


            {/* STATS */}
            <div className="stats-container">

                <div className="stat-card">
                    <div className="stat-icon purple">📋</div>
                    <p>Total Tasks</p>
                    <h2>{totalTasks}</h2>
                    <span>Tasks created</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">✅</div>
                    <p>Completed Tasks</p>
                    <h2>{completedTasks}</h2>
                    <span>Tasks completed</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">🎯</div>
                    <p>Active Habits</p>
                    <h2>{totalHabits}</h2>
                    <span>Habits you're tracking</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon blue">🔥</div>
                    <p>Best Streak</p>
                    <h2>{bestStreak}</h2>
                    <span>Your personal best</span>
                </div>

            </div>


            {/* DASHBOARD SECTIONS */}
            <div className="dashboard-sections">

                {/* RECENT TASKS */}
                <section className="dashboard-card">
                    <div className="section-heading">
                        <h2>Recent Tasks</h2>
                        <span>View all</span>
                    </div>

                    {recentTasks.length === 0 ? (
                        <div className="empty-state">
                            <span>📋</span>
                            <h3>No tasks yet</h3>
                            <p>Your recent tasks will appear here.</p>
                        </div>
                    ) : (
                        <div className="recent-tasks-list">
                            {recentTasks.map((task) => (
                                <div className="recent-task-item" key={task._id}>
                                    <div>
                                        <h3>{task.title}</h3>
                                        <span className={`priority-badge ${task.priority}`}>
                                            {task.priority}
                                        </span>
                                    </div>

                                    <span className={`recent-task-status ${task.status}`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>


                {/* DAILY HABITS */}
                <section className="dashboard-card">
                    <div className="section-heading">
                        <h2>Daily Habits</h2>
                        <span>{completedToday}/{totalHabits} completed</span>
                    </div>

                    {habits.length === 0 ? (
                        <div className="empty-state">
                            <span>🎯</span>
                            <h3>No habits yet</h3>
                            <p>Your daily habits will appear here.</p>
                        </div>
                    ) : (
                        <div className="recent-tasks-list">
                            {habits.map((habit) => {
                                const isCompleted = habit.completedDates?.includes(today);

                                return (
                                    <div className="recent-task-item" key={habit._id}>
                                        <div>
                                            <h3>{habit.name}</h3>
                                            <span className="habit-streak">
                                                🔥 {habit.currentStreak || 0} day streak
                                            </span>
                                        </div>

                                        <span className={`recent-task-status ${isCompleted ? "completed" : "pending"}`}>
                                            {isCompleted ? "Completed" : "Pending"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

            </div>

        </div>
    );
}

export default Dashboard;