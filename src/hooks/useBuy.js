import { useState } from "react";
import Data from "../components/Data";

const useBuy = () => {

    const url = Data + "comprar_cupon";

    const buyCoupons = async (purchaseData) => {

        try {
            // Simular validación de tarjeta básica
            if (purchaseData.cardDetails.number.length !== 16) {
                throw new Error("Número de tarjeta inválido");
            }

            if (purchaseData.cardDetails.cvc.length < 3) {
                throw new Error("Código de seguridad inválido");
            }

            const requestData = {
                oferta_id: purchaseData.oferta_id,
                cliente_id: purchaseData.cliente_id
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include", // Necesario para cookies (Sanctum)
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            return data; //retornando data
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    };

    return { buyCoupons }

}

export default useBuy