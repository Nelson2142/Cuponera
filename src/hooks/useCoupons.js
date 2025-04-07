import { useState } from "react";
import Data from "../components/Data";

const useCoupons = () => {

    const url = Data + "listar_cupones"; // URL de la API para los cupones
    const url_filter = Data + "filtrar_cupones";
    const [coupons, setCoupons] = useState([]);
    const [Filter_coupons, setFilter_coupons] = useState([]);

    const getCoupons = async (cliente_id) => { //getting all coupons
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include", // Necesario para cookies (Sanctum)
                body: JSON.stringify({ cliente_id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            setCoupons(data.data);
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const filter_coupons = async (cliente_id, estado) => { //getting one type of coupons
        try {
            const response = await fetch(url_filter, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include", // Necesario para cookies (Sanctum)
                body: JSON.stringify({ cliente_id, estado }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            setFilter_coupons(data.data);
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return { getCoupons, coupons, Filter_coupons, filter_coupons }


}

export default useCoupons