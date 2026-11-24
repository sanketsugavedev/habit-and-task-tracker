
import HabitCard from './HabitCard';
import './HabitList.css';

function HabitList({ habits, onEdit, onDelete, onComplete, onAddHabit }) {
    if (habits.length === 0) {
        return (
            <div className="habit-empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No habits added yet</h3>
                <p>
                    Start building a better routine by adding your first habit.
                </p>

                <button className="primary-btn" onClick={onAddHabit}>
                    + Add Your First Habit
                </button>
            </div>
        );
    }

    return (
        <div className="habit-list">
            {habits.map((habit) => (
                <HabitCard
                    key={habit._id}
                    habit={habit}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}

export default HabitList;
