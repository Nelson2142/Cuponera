import React, { useState } from "react";
import useResetPassword from "../hooks/useResetPassword";

const ResetPassword = () => {
    const { message, sendResetLink, resetPassword } = useResetPassword();
    const [step, setStep] = useState(1); // Controla los pasos (1: solicitar código, 2: cambiar contraseña)
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [isSending, setIsSending] = useState(false);  
    const [isSubmitting, setIsSubmitting] = useState(false);  

    const handleRequestCode = async (e) => {
        e.preventDefault();
        if (isSending) return; 
        setIsSending(true); 
        await sendResetLink(email); 
        setStep(2); 
        setIsSending(false); 
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 
        await resetPassword(email, password, token);  
        setIsSubmitting(false); 
    };

    return (
        <>
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">La cuponera || Don Bosco</a>
            </div>
        </nav>
        <div className="container mt-5 pt-5">
            <h2 className="text-center mb-4">{step === 1 ? "Recupera tu cuenta" : "Restablecer contraseña"}</h2>

            { }
            {message && (
                <div className={`alert ${message.includes("error") ? "alert-danger" : "alert-success"}`} role="alert">
                    <i className={`bi ${message.includes("error") ? "bi-x-circle" : "bi-check-circle"} me-2`}></i>
                    {message}
                </div>
            )}

            {step === 1 ? (
                <form onSubmit={handleRequestCode} className="w-50 mx-auto shadow p-4 rounded">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isSending}>
                        {isSending ? (
                            <span><i className="bi bi-arrow-clockwise spin"></i> Enviando...</span>
                        ) : (
                            "Enviar Código"
                        )}
                    </button>
                    <p className="text-center mt-4" style={{ fontSize: '1.1rem' }}>
                    ¿Recordar tu contraseña? <a href="/Login" className="text-decoration-none text-primary">Iniciar sesión</a>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleResetPassword} className="w-50 mx-auto shadow p-4 rounded">
                    <div className="mb-3">
                        <label htmlFor="token" className="form-label">Código recibidP</label>
                        <input
                            type="text"
                            id="token"
                            className="form-control"
                            placeholder="Código recibido"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Nueva contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span><i className="bi bi-arrow-clockwise spin"></i> Restableciendo...</span>
                        ) : (
                            <><i className="bi bi-lock-fill me-2"></i> Restablecer Contraseña</>
                        )}
                    </button>
                </form>
            )}
        </div>
        </>
    );
};

export default ResetPassword;
