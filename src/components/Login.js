import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Login = () => {
    const { login } = useLogin(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Por favor, ingrese ambos campos");
            return;
        }

        try {
            const response = await login(email, password);

            if (response.message === 'Credenciales inválidas') {
                setError("Correo o contraseña incorrectos.");
            } else if (response.message === 'Por favor verifica tu cuenta antes de iniciar sesión') {
                setError("Por favor verifica tu cuenta antes de iniciar sesión.");
            } else if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                console.log("Inicio de sesión exitoso, token recibido:", response.access_token);
            }
        } catch (err) {
            setError("Error al iniciar sesión. Intente de nuevo.");
        }
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">La cuponera || Don Bosco</a>
                </div>
            </nav>
            
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-lg rounded-3 w-75" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Iniciar Sesión</h2>

                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-x-circle-fill me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label" style={{ fontSize: '1.1rem' }}>Correo electrónico</label>
                                <input type="email" className="form-control form-control-lg" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" style={{ fontSize: '1.1rem' }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label" style={{ fontSize: '1.1rem' }}>Contraseña</label>
                                <input type="password" className="form-control form-control-lg" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" style={{ fontSize: '1.1rem' }}
                                />
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                                <a href="/ResetPassword" className="text-decoration-none text-primary" style={{ fontSize: '1rem' }}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <div className="text-center mb-4">
                                <button type="submit" className="btn btn-primary w-100 btn-lg">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>

                        <p className="text-center mt-4" style={{ fontSize: '1.1rem' }}>
                            ¿No tienes cuenta? <a href="/Register" className="text-decoration-none text-primary">Regístrate</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
