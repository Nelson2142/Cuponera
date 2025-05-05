import React, { useEffect, useState } from "react";
import useCoupons from '../hooks/useCoupons';
import Footer from "./Footer";

const Coupons = () => {
    const { getCoupons, coupons, Filter_coupons, filter_coupons } = useCoupons();
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
    const [cuponesMostrados, setCuponesMostrados] = useState([]);

    // Función para aplicar el filtro
    const aplicarFiltro = () => {
        const UserData = localStorage.getItem("user");
        if (UserData) {
            const userObj = JSON.parse(UserData);
            const cliente_id = userObj.id;

            if (estadoSeleccionado === 'Todos') {
                getCoupons(cliente_id);
            } else {
                filter_coupons(cliente_id, estadoSeleccionado);
            }
        }
    };

    // Efect para manejar los cambios en los cupones
    useEffect(() => {
        aplicarFiltro();
    }, [estadoSeleccionado]);

    // Efect para actualizar los cupones mostrados
    useEffect(() => {
        if (estadoSeleccionado === 'Todos') {
            setCuponesMostrados(coupons);
        } else {
            setCuponesMostrados(Filter_coupons);
        }
    }, [coupons, Filter_coupons, estadoSeleccionado]);

    return (
        <>
            <div className="container py-4" style={{ marginBottom: "50px" }}>
                <h2 className="mb-4">Tus cupones</h2>
                <div className="d-flex align-items-center mb-4">
                    <h4 className="mb-0">Puedes categorizar tus cupones:</h4>

                    <div className="dropdown ms-3">
                        <a className="btn btn-warning dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {estadoSeleccionado}
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => setEstadoSeleccionado('Todos')}>Todos</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setEstadoSeleccionado('Disponible')}>Disponible</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setEstadoSeleccionado('Canjeado')}>Canjeado</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setEstadoSeleccionado('Vencido')}>Vencido</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    {
                        cuponesMostrados.length === 0 ? (
                            <div className="text-center py-5 my-4 bg-light rounded-3">
                                <div className="container-fluid py-5">
                                    <i className="bi bi-emoji-frown display-1 text-warning mb-4"></i>
                                    <h2 className="fw-bold text-muted">
                                        ¡Ups! parece que no tienes cupones {estadoSeleccionado !== 'Todos' ? `en estado "${estadoSeleccionado}"` : 'disponibles'}
                                    </h2>
                                    <p className="lead text-muted">
                                        {estadoSeleccionado !== 'Todos'
                                            ? 'Parece que no tienes cupones con este estado actualmente.'
                                            : 'Aún no has adquirido ningún cupón.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            cuponesMostrados.map((coupon) => (
                                <div className="col-md-4 mb-4" key={coupon.id}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary d-flex align-items-center">
                                                <i className="bi bi-ticket-perforated me-2"></i>
                                                {coupon.oferta.titulo}
                                            </h5>
                                            <p className="card-text">{coupon.oferta.descripcion}</p>
                                            <div className="d-flex align-items-center mb-2">
                                                Código: <code className="bg-light px-2 py-1 rounded">{coupon.codigo}</code>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                Monto: <code className="bg-light px-2 py-1 rounded">${coupon.monto}</code>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                Este cupón esta: <code className="bg-light px-2 py-1 rounded">{coupon.estado}</code>
                                            </div>
                                            <p className="text-muted small">
                                                <i className="bi bi-bag me-1"></i> Fecha de compra: {coupon.fecha_compra}
                                            </p>
                                            <p className="text-muted small">
                                                <i className="bi bi-calendar-event me-1"></i> Válido hasta:
                                                <span style={{ color: 'red' }}><b> {coupon.oferta.fecha_limite_cupon}</b></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Coupons;