import {useState} from 'react';
import './Register.css';
import axios  from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async (e) => {
        e.preventDefault();

        try {
            const user = {
                username,
                email,
                password
            };

            const response = await axios.post('/api/auth/register', user);

            console.log(response.data);

        } catch (e) {
            console.error('Error:', e.response?.data || e.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={createUser}>
                <h2>Create Account</h2>
                <p>Start building better habits today.</p>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Create Account</button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
