import React from "react";

const Oferts = ({ oferts }) => {
    return (
        <div className="container py-3" style={{ marginTop: "100px" }}>
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal text-body-emphasis">Tu Cuponera Digital</h1>
                <p className="fs-5 text-body-secondary">"Ahorra más, disfruta más. ¡Tus mejores descuentos en un solo lugar!"</p>
                <hr className="my-4" />
                <h4 className="display-6 fw-normal text-body-emphasis">Nuestras Ofertas Disponibles</h4>
            </div>
            <main>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    {
                        oferts.map((ofert) => (
                            <div className="col" key={ofert.id}>
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">{ofert.titulo}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title"><s>${ofert.precio_regular}</s> | ${ofert.precio_oferta}</h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li style={{marginBottom: 15}}>{ofert.descripcion}</li>
                                            <li><b>Empresa ofertante:</b> {ofert.empresa.nombre}</li>
                                            <li><b>Esta oferta estara disponible hasta:</b></li>
                                            <li style={{color: "red"}}><b>{ofert.fecha_fin}</b></li>
                                        </ul>
                                        <button type="button" className="w-100 btn btn-lg btn-success"><i class="bi bi-bag"></i> Comprar cupón</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    );
}

export default Oferts;