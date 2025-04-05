import { useState } from "react";
import Data from "../components/Data"; 

const useResetPassword = () => {
    const [message, setMessage] = useState(null);

    // Enviar código de recuperación al email
    const sendResetLink = async (email) => {
        try {
            const response = await fetch(Data + "password/email", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error al enviar el código");
            }

            setMessage("Código enviado a tu correo");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Restablecer contraseña con el código recibido
    const resetPassword = async (email, password, token) => {
        try {
            const response = await fetch(Data + "password/reset", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, token }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error al restablecer la contraseña");
            }

            setMessage("Contraseña restablecida con éxito");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return { message, sendResetLink, resetPassword };
};

export default useResetPassword;
