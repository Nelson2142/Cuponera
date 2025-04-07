import Data from "../components/Data";

const useChangePassword = () => {
    const url_sen_email = Data + "password/email"; // URL de la API para enviar el correo electrónico de restablecimiento de contraseña
    const url_change_password = Data + "password/reset"; // URL de la API para el cambio de contraseña

    const SendEmail = async (email) => { // Función para enviar el correo electrónico de restablecimiento de contraseña
        const response = await fetch(url_sen_email, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                email,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data; // Retorna la respuesta completa para manejarla en el componente
    }

    // Función para cambiar la contraseña
    const changePassword = async (email, password, token) => {

        const response = await fetch(url_change_password, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                email,
                password,
                token
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data; // Retorna la respuesta completa para manejarla en el componente

    };

    return { changePassword, SendEmail };
}

export default useChangePassword;