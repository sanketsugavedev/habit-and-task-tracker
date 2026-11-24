import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            try {
                const response = await axios.get("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data.user);
                setIsAuthenticated(true);

            } catch (error) {
                console.error("Authentication check failed:", error);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem("token");
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);

        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;