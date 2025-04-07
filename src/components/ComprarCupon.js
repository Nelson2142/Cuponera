import React from 'react';

const ComprarCupon = ({ cupon, setVista, user }) => {
    const handleCompra = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/comprar_cupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oferta_id: cupon.id,
                    cliente_id: user.id
                }),
            });

            if (!response.ok) {
                throw new Error('Error al comprar el cupón');
            }

            alert("¡Cupón comprado con éxito!");
            setVista("mis_cupones"); // ⬅️ Redirige a Mis Cupones
        } catch (error) {
            console.error(error);
            alert("Error al comprar el cupón. Inténtalo más tarde.");
        }
    };

    if (!cupon || !user) {
        return (
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="alert alert-warning">Cargando información del cupón o usuario...</div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="card shadow p-4">
                <h2 className="mb-3">{cupon.titulo}</h2>
                <p><strong>Descripción:</strong> {cupon.descripcion}</p>
                <p><strong>Precio regular:</strong> ${cupon.precio_regular}</p>
                <p><strong>Precio oferta:</strong> ${cupon.precio_oferta}</p>
                <p><strong>Empresa:</strong> {cupon.empresa?.nombre}</p>
                <p><strong>Disponible hasta:</strong> {cupon.fecha_fin}</p>

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary" onClick={() => setVista("inicio")}>
                        Volver
                    </button>
                    <button className="btn btn-success" onClick={handleCompra}>
                        <i className="bi bi-bag-check"></i> Confirmar compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComprarCupon;
