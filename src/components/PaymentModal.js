import React, { useState } from "react";

const PaymentModal = ({ show, onClose, buyCoupons, user, setseeOfert, ofert, getOferts }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardName, setCardName] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }
        setExpiryDate(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        if (!cardNumber || !expiryDate || !cvc || !cardName || !cantidad) {
            setError("Por favor, ingrese la información solicitada");
            setIsProcessing(false)
            return;
        }
        setError(null);
        try {

            const purchaseData = {
                oferta_id: ofert.id,
                cliente_id: user.id,
                cantidad: cantidad,
                paymentMethod: "credit_card",
                cardDetails: {
                    number: cardNumber.replace(/\s/g, ""),
                    expMonth: expiryDate.split("/")[0],
                    expYear: expiryDate.split("/")[1],
                    cvc: cvc
                }
            };

            const response = await buyCoupons(purchaseData);

            if (response.success && response.message) {
                alert("¡Compra exitosa! se te ha enviado la información de la compra a tu correo eletrónico.");
                onClose()
                ClearForm()
                setseeOfert()
                getOferts()
            } else {
                throw new Error("La compra no pudo ser procesada correctamente");
            }
        } catch (error) {
            alert(`Error en la compra: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const ClearForm = () => {
        setCardName('');
        setExpiryDate('')
        setCvc('')
        setCantidad('');
        setCardNumber('')
    }

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="bi bi-bag"></i> Comprar cupón</h5>
                        <button type="button" className="btn-close" onClick={() => {
                            ClearForm()
                            setError(null)
                            onClose()
                        }}></button>
                    </div>
                    <div className="modal-body">
                        {ofert && (
                            <div className="mb-4">
                                <h5>Cupón: {ofert.titulo}</h5>
                                <p className="mb-1"><strong>Precio:</strong> ${ofert.precio_oferta}</p>
                                <p><strong>Ahorras:</strong> ${ofert.precio_regular - ofert.precio_oferta}</p>
                            </div>
                        )}
                        {
                            error && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <i className="bi bi-x-circle-fill me-2"></i>
                                    {error}
                                </div>
                            )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label"><i className="bi bi-person"></i> Nombre en la tarjeta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardName"
                                    placeholder="Ej. Juan Pérez"
                                    value={cardName}
                                    disabled={isProcessing}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label"><i className="bi bi-bag"></i> Cantidad a comprar</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cantidad"
                                    placeholder="Ingrese la cantidad que desea comprar"
                                    value={cantidad}
                                    disabled={isProcessing}
                                    onChange={(e) => setCantidad(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label"><i className="bi bi-credit-card"></i> Número de tarjeta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    disabled={isProcessing}
                                    maxLength="19"
                                />
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="expiryDate" className="form-label"><i className="bi bi-credit-card-2-front"></i> Fecha de expiración (MM/AA)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiryDate"
                                        placeholder="MM/AA"
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                        disabled={isProcessing}
                                        maxLength="5"
                                    />
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="cvc" className="form-label"><i className="bi bi-credit-card-2-back"></i> Código de seguridad (CVC)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvc"
                                        placeholder="123"
                                        value={cvc}
                                        disabled={isProcessing}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                                        maxLength="4"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="ms-2">Procesando pago...</span>
                                    </>
                                ) : (
                                    "Confirmar Pago"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;