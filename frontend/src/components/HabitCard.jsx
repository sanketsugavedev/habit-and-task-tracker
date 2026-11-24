
import './HabitCard.css';

function HabitCard({ habit, onEdit, onDelete, onComplete }) {
    const today = new Date().toLocaleDateString("en-CA");

    const completedToday = habit.completedDates?.includes(today);

    return (
        <div className={`habit-card ${completedToday ? "completed" : ""}`}>
            <div className="habit-card-content">
                <div className="habit-card-info">
                    <h3>{habit.title}</h3>

                    {habit.description && (
                        <p>{habit.description}</p>
                    )}

                    <div className="habit-card-meta">
                        <span className="habit-frequency">
                            {habit.frequency}
                        </span>

                        <span className="habit-streak">
                            🔥 {habit.currentStreak || 0} day streak
                        </span>
                    </div>
                </div>

                <div className="habit-card-actions">
                    <button
                        className={`complete-habit-btn ${completedToday ? "completed" : ""}`}
                        onClick={() => onComplete(habit)}
                        disabled={completedToday}
                    >
                        {completedToday ? "✓ Completed" : "Mark Complete"}
                    </button>

                    <button
                        className="edit-habit-btn"
                        onClick={() => onEdit(habit)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-habit-btn"
                        onClick={() => onDelete(habit._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HabitCard;
