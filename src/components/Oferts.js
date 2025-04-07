import React, { useState } from "react";
import Footer from "./Footer";
import useBuy from "../hooks/useBuy";
import PaymentModal from "./PaymentModal";

const Oferts = ({ oferts, user, isVerified }) => {

    const { buyCoupons } = useBuy();
    const [selectedOfert, setSelectedOfert] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBuyClick = (ofert) => { //seleccionar oferta a comprar
        if (!user || !isVerified) { //verificar si el usuario esta logeado y autenticado
            alert("¡Debe iniciar sesión y estar verificado para poder comprar nuestros cupones!");
            return;
        }
        setSelectedOfert(ofert);
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = async (paymentData) => { //procesar compra
        setIsProcessing(true);
        try {
            const UserData = localStorage.getItem("user")
            const userObj = JSON.parse(UserData)
            const cliente_id = userObj.id

            const purchaseData = {
                oferta_id: selectedOfert.id,
                cliente_id: cliente_id,
                paymentMethod: "credit_card",
                cardDetails: {
                    number: paymentData.cardNumber.replace(/\s/g, ""),
                    expMonth: paymentData.expiryDate.split("/")[0],
                    expYear: paymentData.expiryDate.split("/")[1],
                    cvc: paymentData.cvc
                }
            };

            const response = await buyCoupons(purchaseData);

            if (response.success && response.message) {
                alert("¡Compra exitosa! se te ha enviado la información de la compra a tu correo eletrónico.");
                setShowPaymentModal(false);
            } else {
                throw new Error("La compra no pudo ser procesada correctamente");
            }
        } catch (error) {
            alert(`Error en la compra: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="container py-3" style={{ marginTop: "100px", marginBottom: "50px" }}>
                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal text-body-emphasis">Tu Cuponera Digital</h1>
                    <p className="fs-5 text-body-secondary">"Ahorra más, disfruta más. ¡Tus mejores descuentos en un solo lugar!"</p>
                    <hr className="my-4" />
                    <h4 className="display-6 fw-normal text-body-emphasis">Nuestras Ofertas Disponibles</h4>
                </div>
                <main>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        {
                            oferts.length === 0 ? (

                                <div className="container-fluid py-5">
                                    <i className="bi bi-emoji-frown display-1 text-warning mb-4"></i>
                                    <h2 className="fw-bold text-muted">
                                        ¡Ups! parece que no hay ofertas disponibles
                                    </h2>
                                    <p className="lead text-muted">
                                        Pueda que no existan ofertas en vigencia, lo sentimos.
                                    </p>
                                </div>

                            ) : (
                                oferts.map((ofert) => (
                                    <div className="col" key={ofert.id}>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">{ofert.titulo}</h4>
                                            </div>
                                            <div className="card-body">
                                                <h1 className="card-title pricing-card-title"><s>${ofert.precio_regular}</s> | ${ofert.precio_oferta}</h1>
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <li style={{ marginBottom: 15 }}>{ofert.descripcion}</li>
                                                    <li><b>Empresa ofertante:</b> {ofert.empresa.nombre}</li>
                                                    <li><b>Esta oferta estara disponible hasta:</b></li>
                                                    <li style={{ color: "red" }}><b>{ofert.fecha_fin}</b></li>
                                                </ul>
                                                <button type="button" className="w-100 btn btn-lg btn-success"
                                                    onClick={() => handleBuyClick(ofert)}
                                                ><i className="bi bi-bag"></i> Comprar cupón</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </main>
            </div>

            <PaymentModal
                show={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
                ofert={selectedOfert}
            />

            <Footer />
        </>
    );
}

export default Oferts;