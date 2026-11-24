
import { useState,useEffect } from 'react';
import axios from 'axios';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

import './Tasks.css';

function Tasks() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filter, setFilter] = useState("all");

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
            console.log("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            );

        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    const editTask = (task) => {
        setTaskToEdit(task);
        setShowAddTask(true);
    };

    const toggleTask = async (task) => {
        try {
            const token = localStorage.getItem("token");

            const updatedStatus =
                task.status === "completed" ? "pending" : "completed";

            const response = await axios.put(
                `/api/tasks/${task._id}`,
                { status: updatedStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t._id === task._id ? response.data.task : t
                )
            );

        } catch (error) {
            console.log("Error toggling task:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return task.status === "pending";
        if (filter === "completed") return task.status === "completed";

        return true;
    });

    return (
        <div className="tasks-page">

            <div className="page-header">
                <div>
                    <h1>My Tasks</h1>
                    <p>Stay organized and get things done.</p>
                </div>

                <button
                    className="add-task-btn"
                    onClick={() => setShowAddTask(!showAddTask)}
                >
                    {showAddTask ? 'Close Form' : '+ Add Task'}
                </button>
            </div>

            {showAddTask && (
                <AddTask
                    onCancel={() => {
                        setShowAddTask(false);
                        setTaskToEdit(null);
                    }}
                    taskToEdit={taskToEdit}
                    onTaskCreated={(newTask) => {
                        setTasks((prevTasks) => [...prevTasks, newTask]);
                        setShowAddTask(false);
                    }}
                    onTaskUpdated={(updatedTask) => {
                        setTasks((prevTasks) =>
                            prevTasks.map((task) =>
                                task._id === updatedTask._id
                                    ? updatedTask
                                    : task
                            )
                        );
                        setShowAddTask(false);
                        setTaskToEdit(null);
                    }}
                />
            )}

            <div className="task-filters">
                <button
                    className={filter === "all" ? "filter-active" : ""}
                    onClick={() => setFilter("all")}
                >
                    All Tasks
                </button>

                <button
                    className={filter === "pending" ? "filter-active" : ""}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>

                <button
                    className={filter === "completed" ? "filter-active" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
            </div>

            <TaskList
                tasks={filteredTasks}
                onAddTask={() => {
                    setTaskToEdit(null);
                    setShowAddTask(true);
                }}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                onToggleTask={toggleTask}
            />

        </div>
    );
}

export default Tasks;
