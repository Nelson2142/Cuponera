import React from "react";
import Data from "../components/Data";

const useRegister = () => {
    const url = Data + "register"; // URL de la API para el registro

    // Función para registrar un nuevo usuario
    const register = async (nombre, apellido, email, password, password_confirmation, DUI, tipo) => {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                nombre,
                apellido,
                email,
                password,
                password_confirmation,
                DUI,
                tipo
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data; // Retorna la respuesta completa para manejarla en el componente

    };

    return { register };
}

export default useRegister;