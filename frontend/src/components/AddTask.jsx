
import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddTask.css';

function AddTask({ onCancel, onTaskCreated, taskToEdit, onTaskUpdated }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const isEditing = Boolean(taskToEdit);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setPriority(taskToEdit.priority);
            setDueDate(
                taskToEdit.dueDate
                    ? taskToEdit.dueDate.split("T")[0]
                    : ""
            );
        }
    }, [taskToEdit]);

    const createTask = async (e) => {
        e.preventDefault();

        try {
            const taskData = {
                title,
                description,
                priority,
                dueDate: dueDate || null
            };

            const token = localStorage.getItem("token");

            let response;

            if (isEditing) {
                response = await axios.put(
                    `/api/tasks/${taskToEdit._id}`,
                    taskData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                onTaskUpdated(response.data.task);

            } else {
                response = await axios.post(
                    "/api/tasks",
                    taskData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                onTaskCreated(response.data.task);
            }

        } catch (error) {
            console.error(
                "Error creating/updating task:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="add-task-container">

            <div className="add-task-header">
                <h2>{isEditing ? "Edit Task" : "Create New Task"}</h2>
                <p>
                    {isEditing
                        ? "Update your task details."
                        : "Fill in the details of your task."}
                </p>
            </div>

            <form className="add-task-form" onSubmit={createTask}>

                <div className="form-group">
                    <label>Task Title</label>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Enter task description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-task-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="save-task-btn">
                        {isEditing ? "Update Task" : "Create Task"}
                    </button>
                </div>

            </form>

        </div>
    );
}

export default AddTask;
