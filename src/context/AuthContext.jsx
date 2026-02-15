import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const stored = localStorage.getItem("anik_user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const register = async (data) => {
        const res = await registerUser(data);
        setUser(res.data);
        localStorage.setItem("anik_user", JSON.stringify(res.data));
        return res.data;
    };

    const login = async (data) => {
        const res = await loginUser(data);
        setUser(res.data);
        localStorage.setItem("anik_user", JSON.stringify(res.data));
        return res.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("anik_user");
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

