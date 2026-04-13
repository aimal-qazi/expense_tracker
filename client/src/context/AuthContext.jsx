import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoader(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loader && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}