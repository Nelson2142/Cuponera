import { useState } from "react";
import Data from "../components/Data";

const useLogin = () => {
    const url = Data + "login"; // URL de la API para el login
    const [user, setUser] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    // Función para iniciar sesión 
    const login = async (email, password) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include", // Necesario para cookies (Sanctum)
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            setUser(data.usuario);
            setIsVerified(data.usuario.verificado === 1);
            console.log("Usuario autenticado:", data.usuario);
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            setUser(null);
            setIsVerified(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    return { user, isVerified, login, logout };
};

export default useLogin;