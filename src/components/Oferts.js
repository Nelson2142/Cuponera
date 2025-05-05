import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import useBuy from "../hooks/useBuy";
import PaymentModal from "./PaymentModal";

const Oferts = ({ oferts, user, isVerified, getOferts }) => {

    const { buyCoupons } = useBuy();
    const [selectedOfert, setSelectedOfert] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [seeOfert, setseeOfert] = useState(null);

    const handleBuyClick = (ofert) => { //seleccionar oferta a comprar
        if (!user || !isVerified) { //verificar si el usuario esta logeado y autenticado
            alert("¡Debe iniciar sesión y estar verificado para poder comprar nuestros cupones!");
            return;
        }
        setSelectedOfert(ofert);
        setShowPaymentModal(true);
    };

    const handleseeOfert = (ofert) => {
        setseeOfert(ofert);
    }

    useEffect(() => {

    }, [seeOfert])

    return (
        <>
            <div className="container py-3" style={{ marginTop: "100px", marginBottom: "50px" }}>
                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal text-body-emphasis">Tu Cuponera Digital</h1>
                    <p className="fs-5 text-body-secondary">"Ahorra más, disfruta más. ¡Tus mejores descuentos en un solo lugar!"</p>
                    <hr className="my-4" />
                    <h4 className="display-6 fw-normal text-body-emphasis">{seeOfert ? 'Información sobre la oferta' : 'Nuestras Ofertas Disponibles'}</h4>
                </div>
                <main>
                    {
                        seeOfert ? (
                            <div className="container-fluid mt-4 d-flex justify-content-center">
                                <div
                                    className="card shadow-lg"
                                    style={{
                                        width: '100%',
                                        maxWidth: '1200px'
                                    }}
                                >
                                    <div className="card-header bg-danger text-white text-center">
                                        <h3 className="mb-0">{seeOfert.titulo}</h3>
                                    </div>

                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <h5 className="text-primary"><i className="bi bi-building"></i> Detalles de la Empresa</h5>
                                                <ul className="list-group mb-3">
                                                    <li className="list-group-item"><strong>Nombre:</strong> {seeOfert.empresa.nombre}</li>
                                                    <li className="list-group-item"><strong>Dirección:</strong> {seeOfert.empresa.direccion}</li>
                                                    <li className="list-group-item"><strong>Contacto:</strong> {seeOfert.empresa.nombre_contacto}</li>
                                                    <li className="list-group-item"><strong>Teléfono:</strong> {seeOfert.empresa.telefono}</li>
                                                    <li className="list-group-item"><strong>Email:</strong> {seeOfert.empresa.email}</li>
                                                </ul>
                                            </div>

                                            <div className="col-md-6">
                                                <h5 className="text-primary"><i className="bi bi-cash"></i> Precio oferta</h5>
                                                <p className="fs-5">
                                                    <del className="text-muted">${seeOfert.precio_regular}</del> &nbsp;
                                                    <strong className="text-success fs-4">${seeOfert.precio_oferta}</strong>
                                                </p>

                                                <h5 className="text-primary"><i className="bi bi-calendar"></i> Fechas importantes</h5>
                                                <ul className="list-group mb-3">
                                                    <li className="list-group-item"><strong>Inicio:</strong> {new Date(seeOfert.fecha_inicio).toLocaleString()}</li>
                                                    <li className="list-group-item"><strong>Fin:</strong> {new Date(seeOfert.fecha_fin).toLocaleString()}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <h5 className="text-primary"><i className="bi bi-info-square"></i> Información Adicional</h5>
                                        <p><strong>Descripción:</strong> {seeOfert.descripcion}</p>
                                        <p><strong>Cupones disponibles:</strong><span style={{ color: seeOfert.cantidad_limite_cupones === 0 ? 'red' : 'black' }}> {seeOfert.cantidad_limite_cupones} cupones</span></p>
                                    </div>

                                    <div className="card-footer text-center">
                                        <button className="btn btn-warning btn-lg" onClick={() => setseeOfert(null)} style={{ marginRight: '10px' }}>
                                            <i className="bi bi-arrow-left"></i> Volver
                                        </button>
                                        <button className="btn btn-success btn-lg" disabled={seeOfert.cantidad_limite_cupones === 0} onClick={() => handleBuyClick(seeOfert)}>
                                            <i className="bi bi-bag"></i> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            oferts.length === 0 ? (
                                <div className="container-fluid py-5 text-center">
                                    <i className="bi bi-emoji-frown display-1 text-warning mb-4"></i>
                                    <h2 className="fw-bold text-muted">¡Ups! parece que no hay ofertas disponibles</h2>
                                    <p className="lead text-muted">Pueda que no existan ofertas en vigencia, lo sentimos.</p>
                                </div>
                            ) : (
                                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                                    {
                                        oferts.map((ofert) => (
                                            <div className="col" key={ofert.id}>
                                                <div className="card mb-4 rounded-3 shadow-sm">
                                                    <div className="card-header py-3">
                                                        <h4 className="my-0 fw-normal">{ofert.titulo}</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <h1 className="card-title pricing-card-title">
                                                            <s>${ofert.precio_regular}</s> | ${ofert.precio_oferta}
                                                        </h1>
                                                        <ul className="list-unstyled mt-3 mb-4">
                                                            <li style={{ marginBottom: 15 }}>{ofert.descripcion}</li>
                                                            <li><b>Empresa ofertante:</b> {ofert.empresa.nombre}</li>
                                                            <li><b>Esta oferta estará disponible hasta:</b></li>
                                                            <li style={{ color: "red" }}><b>{ofert.fecha_fin}</b></li>
                                                        </ul>
                                                        <div className="align-items-center mb-2">
                                                            <code className="bg-light px-2 rounded">{ofert.cantidad_limite_cupones === 0 ? 'Cupones agotados' : ''}</code>
                                                        </div>
                                                        <button type="button" className="w-100 btn btn-lg btn-success" disabled={ofert.cantidad_limite_cupones === 0} onClick={() => handleBuyClick(ofert)}>
                                                            <i className="bi bi-bag"></i> Comprar cupón
                                                        </button>
                                                        <button type="button" className="w-100 btn btn-lg btn-warning mt-2" onClick={() => handleseeOfert(ofert)}>
                                                            <i className="bi bi-eye"></i> Ver detalles
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            )
                        )
                    }


                </main>
            </div>

            <PaymentModal
                show={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                buyCoupons={buyCoupons}
                user={user}
                setseeOfert={() => setseeOfert(null)}
                ofert={selectedOfert}
                getOferts={getOferts}
            />

            <Footer />
        </>
    );
}

export default Oferts;