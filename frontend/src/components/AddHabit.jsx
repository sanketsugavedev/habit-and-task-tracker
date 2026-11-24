
import { useState, useEffect } from 'react';
import './AddHabit.css';

function AddHabit({ onCancel, onHabitCreated, habitToEdit, onHabitUpdated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("daily");

    const isEditing = Boolean(habitToEdit);

    useEffect(() => {
        if (habitToEdit) {
            setTitle(habitToEdit.title);
            setDescription(habitToEdit.description || "");
            setFrequency(habitToEdit.frequency || "daily");
        }
    }, [habitToEdit]);

    const saveHabit = async (e) => {
        e.preventDefault();

        const habitData = {
            title,
            description,
            frequency
        };

        if (isEditing) {
            onHabitUpdated(habitToEdit._id, habitData);
        } else {
            onHabitCreated(habitData);
        }
    };

    return (
        <div className="add-habit-container">
            <div className="add-habit-header">
                <h2>{isEditing ? "Edit Habit" : "Create New Habit"}</h2>
                <p>
                    {isEditing
                        ? "Update your habit details."
                        : "Start building a consistent routine."}
                </p>
            </div>

            <form className="add-habit-form" onSubmit={saveHabit}>
                <div className="form-group">
                    <label htmlFor="habit-name">Habit Name</label>
                    <input
                        id="habit-name"
                        type="text"
                        placeholder="e.g. Read for 30 minutes"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="habit-description">Description</label>
                    <textarea
                        id="habit-description"
                        placeholder="Describe your habit..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="habit-frequency">Frequency</label>
                    <select
                        id="habit-frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>

                <div className="habit-form-buttons">
                    <button
                        type="button"
                        className="cancel-habit-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="save-habit-btn">
                        {isEditing ? "Update Habit" : "Create Habit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddHabit;
