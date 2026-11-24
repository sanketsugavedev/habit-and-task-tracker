
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/*"
                    element={
                        <div className="app-container">

                            <Sidebar />

                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/tasks" element={<Tasks />} />
                                    <Route path="/habits" element={<Habits />} />
                                </Routes>
                            </main>

                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
