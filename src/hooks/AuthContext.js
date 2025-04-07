import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(); // Creación del contexto de autenticación para compartir el estado de autenticación entre componentes

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsVerified(JSON.parse(savedUser).verificado === 1);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isVerified, setUser, setIsVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);