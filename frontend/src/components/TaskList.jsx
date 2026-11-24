
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks = [], onAddTask, onDeleteTask, onEditTask, onToggleTask }) {
    return (
        <div className="tasks-list">

            {tasks.length === 0 ? (

                <div className="empty-state">
                    <div className="empty-icon">📋</div>

                    <h3>No tasks found</h3>

                    <p>
                        Create your first task and start getting things done.
                    </p>

                    <button
                        className="add-task-btn"
                        onClick={onAddTask}
                    >
                        + Create Your First Task
                    </button>
                </div>

            ) : (

                tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                        onToggleTask={onToggleTask}
                    />
                ))

            )}

        </div>
    );
}

export default TaskList;
