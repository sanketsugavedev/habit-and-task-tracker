
import './TaskCard.css';

function TaskCard({ task, onDeleteTask, onEditTask, onToggleTask  }) {
    return (
        <div className="task-card">

            <div className="task-card-left">

                <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => onToggleTask(task)}
                />

                <div className="task-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>

            </div>

            <div className="task-card-right">

                <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                </span>

                <span className="task-due-date">
                    {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"}
                </span>

                <div className="task-actions">
                    <button className="edit-task-btn" onClick={() => onEditTask(task)}>Edit</button>
                    <button className="delete-task-btn" onClick={() => onDeleteTask(task._id)}>Delete</button>
                </div>

            </div>

        </div>
    );
}

export default TaskCard;
