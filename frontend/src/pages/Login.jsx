import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const user = { email, password };

            const response = await axios.post('/api/auth/login', user);

            login(response.data.user, response.data.token);

            navigate("/dashboard");

            console.log(response.data);

        } catch (e) {
            console.error('Error:', e.response?.data || e.message);
        }
    };
        return (
        <div className="login-container">
            <form className="login-form" onSubmit={loginUser}>
                <h2>Welcome Back!</h2>
                <p>Login to continue your productivity journey.</p>

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

                <button type="submit">Login</button>

                <p className="register-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
