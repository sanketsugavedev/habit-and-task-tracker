
import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>TaskFlow</h2>
            </div>

            {isAuthenticated ? (
                <>
                    <div className="sidebar-user">
                        <h3>Welcome, {user?.username}</h3>
                    </div>

                    <nav className="sidebar-nav">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/tasks">Tasks</NavLink>
                        <NavLink to="/habits">Habits</NavLink>
                    </nav>

                    <div className="sidebar-footer">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <div className="sidebar-auth">
                    <p>Welcome, Guest!</p>

                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}

        </aside>
    );
}

export default Sidebar;
