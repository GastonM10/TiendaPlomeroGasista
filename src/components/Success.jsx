import React from "react";
import { useLocation } from "react-router-dom";

export const Success = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    return (
        <div className="container text-center mt-5">
            <h1>¡Pago exitoso! 🎉</h1>
            <p>Tu ID de pago es: <strong>{query.get("payment_id")}</strong></p>
            <p>Estado: <strong>{query.get("status")}</strong></p>
            <p>Método de pago: <strong>{query.get("payment_type")}</strong></p>
        </div>
    );
};
