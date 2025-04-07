import { useState } from "react";
import Data from "../components/Data";
import { useAuth } from "./AuthContext"; // Importa el contexto de autenticación

const useLogin = () => {
    const url = Data + "login"; // URL de la API para el login

    const { setUser, setIsVerified } = useAuth();

    // Función para iniciar sesión 
    const login = async (email, password) => {

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
        localStorage.setItem("user", JSON.stringify(data.usuario)); // Guarda el usuario en localStorage
        setUser(data.usuario);
        setIsVerified(data.usuario.verificado === 1);
        console.log("Usuario autenticado:", data.usuario);
        return data; // Retorna la respuesta completa para manejarla en el componente

    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            localStorage.removeItem('user'); // Elimina el usuario del localStorage
            setUser(null);
            setIsVerified(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    return { login, logout };
};

export default useLogin;