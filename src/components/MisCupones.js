import React, { useEffect, useState } from 'react';

const MisCupones = ({ user, setVista }) => {
    const [cupones, setCupones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCupones = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/listar_cupones`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cliente_id: user.id }),
                });

                const data = await response.json();
                setCupones(data.data || []);
            } catch (error) {
                console.error('Error cargando los cupones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCupones();
    }, [user.id]);

    if (loading) return <div className="container mt-5">Cargando tus cupones...</div>;

    return (
        <div className="container mt-5">
            <h2>Mis Cupones</h2>
            {cupones.length === 0 ? (
                <p>No has comprado cupones todavía.</p>
            ) : (
                <div className="row">
                    {cupones.map((cupon) => (
                        <div key={cupon.id} className="col-md-4 mb-3">
                            <div className="card p-3 shadow">
                                <h5>{cupon.oferta?.titulo}</h5>
                                <p><strong>Código:</strong> {cupon.codigo}</p>
                                <p><strong>Fecha de compra:</strong> {cupon.fecha_compra}</p>
                                <p><strong>Monto:</strong> ${cupon.monto}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => setVista("inicio")}>
                Volver a ofertas
            </button>
        </div>
    );
};

export default MisCupones;
