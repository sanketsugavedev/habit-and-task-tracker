
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddHabit from '../components/AddHabit';
import HabitList from '../components/HabitList';
import './Habits.css';

function Habits() {
    const [habits, setHabits] = useState([]);
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState(null);

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
            console.log("Error fetching habits:", error);
        }
    };

    useEffect(() => {
        getHabits();
    }, []);

    const createHabit = async (habitData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/habits",
                habitData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHabits((prevHabits) => [
                ...prevHabits,
                response.data.habit
            ]);

            setShowAddHabit(false);
        } catch (error) {
            console.log("Error creating habit:", error);
        }
    };

    const updateHabit = async (habitId, habitData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `/api/habits/${habitId}`,
                habitData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHabits((prevHabits) =>
                prevHabits.map((habit) =>
                    habit._id === habitId
                        ? response.data.habit
                        : habit
                )
            );

            setShowAddHabit(false);
            setHabitToEdit(null);
        } catch (error) {
            console.log("Error updating habit:", error);
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`/api/habits/${habitId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setHabits((prevHabits) =>
                prevHabits.filter(
                    (habit) => habit._id !== habitId
                )
            );
        } catch (error) {
            console.log("Error deleting habit:", error);
        }
    };

    const completeHabit = async (habit) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `/api/habits/${habit._id}/complete`,
                {date: today},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHabits((prevHabits) =>
                prevHabits.map((item) =>
                    item._id === habit._id
                        ? response.data.habit
                        : item
                )
            );
        } catch (error) {
            console.log("Error completing habit:", error);
        }
    };

    const totalHabits = habits.length;

    const today = new Date().toLocaleDateString("en-CA");

    const completedToday = habits.filter((habit) =>
        habit.completedDates?.includes(today)
    ).length;

    const currentStreak = habits.reduce(
        (highest, habit) =>
            Math.max(highest, habit.currentStreak || 0),
        0
    );

    const editHabit = (habit) => {
        setHabitToEdit(habit);
        setShowAddHabit(true);
    };

    const openAddHabit = () => {
        setHabitToEdit(null);
        setShowAddHabit(true);
    };

    const closeForm = () => {
        setShowAddHabit(false);
        setHabitToEdit(null);
    };

    return (
        <div className="habits-page">

            <div className="page-header">
                <div>
                    <h1>My Habits</h1>
                    <p>Build consistency, one day at a time.</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={openAddHabit}
                >
                    + Add Habit
                </button>
            </div>

            <div className="habits-summary">

                <div className="summary-card">
                    <p>Total Habits</p>
                    <h2>{totalHabits}</h2>
                </div>

                <div className="summary-card">
                    <p>Completed Today</p>
                    <h2>{completedToday}</h2>
                </div>

                <div className="summary-card">
                    <p>Current Streak</p>
                    <h2>{currentStreak} days</h2>
                </div>

            </div>

            {showAddHabit && (
                <AddHabit
                    onCancel={closeForm}
                    habitToEdit={habitToEdit}
                    onHabitCreated={createHabit}
                    onHabitUpdated={updateHabit}
                />
            )}

            <div className="habits-list">
                <HabitList
                    habits={habits}
                    onEdit={editHabit}
                    onDelete={deleteHabit}
                    onComplete={completeHabit}
                    onAddHabit={openAddHabit}
                />
            </div>

        </div>
    );
}

export default Habits;
