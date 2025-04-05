import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';

const Register = () => {
    const { register, error, isLoading } = useRegister();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [dui, setDui] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !apellido || !email || !password || !passwordConfirm || !dui || !tipo) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        await register(nombre, apellido, email, password, passwordConfirm, dui, tipo);
    };

    return (
        <>
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">La cuponera || Don Bosco</a>
            </div>
        </nav>
        <div className="container mt-5 pt-5"> {}
            <div className="card shadow-lg rounded-3">
                <div className="card-body">
                    <h1 className="text-center mb-4">Registrarse</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder=" Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" placeholder="Ingrese su apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordConfirm" className="form-label">Confirmar contraseña</label>
                            <input type="password" className="form-control" id="passwordConfirm" placeholder="Confirme su contraseña" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dui" className="form-label">DUI</label>
                            <input type="text" className="form-control" id="dui" placeholder="Ingrese su DUI" value={dui} onChange={(e) => setDui(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo de usuario</label>
                            <select className="form-select" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="">Seleccione el tipo de usuario</option>
                                <option value="user">Usuario</option>
                                <option value="user"></option>
                            </select>
                        </div>
                        
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-x-circle-fill me-2"></i>
                            {error}
                        </div>
                    )}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <i className="bi bi-arrow-clockwise spin me-2"></i>
                                        Registrando...
                                    </>
                                ) : (
                                    'Registrarse'
                                )}
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>

            <p className="text-center mt-3">
                ¿Ya tienes cuenta? <a href="/Login">Iniciar sesión</a>
            </p>
        </div>
        </>
    );
};

export default Register;
