import { useState } from "react";
import Data from "../components/Data";

const useOferts = () => {
    const url = Data + "list_ofertas_vigentes"; // URL de la API para las ofertas
    const [oferts, setOferts] = useState([]);

    // Función para obtener las ofertas 
    const getOferts = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include", // Necesario para cookies (Sanctum)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            setOferts(data.data); // Guardar las ofertas en el estado
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return { oferts, getOferts };
}

export default useOferts;