import { useState, useEffect } from "react";
import useRegister from "../hooks/useRegister"; // Importar el hook de registro
import img_NewUser from "../assets/img/nueva-cuenta.png"; // Importar la imagen de usuario
import { useNavigate } from "react-router-dom"; // Importar el hook de navegación
import { useAuth } from '../hooks/AuthContext';

const Register = () => {

    const navigate = useNavigate(); // Navegación entre rutas
    const { register } = useRegister(); // Hook para el registro
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_Confirmation] = useState('');
    const [DUI, setDUI] = useState('');
    const { user } = useAuth(); // Hook para verificar el estado del usuario
    const tipo = "Cliente"; // Tipo de usuario, por defecto "Cliente"
    const [error, setError] = useState(null); // Estado para manejar errores
    const [loading, setLoading] = useState(false);

    // Verifica si el usuario ya está autenticado y redirige a la página de inicio
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true }); // Redirige a la página de inicio si el usuario ya está autenticado
        }
    }, [user, navigate]); //se ejecuta cuando el usuario cambia

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Inicia el loading al enviar el formulario

        if (!nombre || !apellido || !email || !password || !password_confirmation || !DUI) {
            setError("Por favor, complete todos los campos.");
            setLoading(false);
            return;
        }

        if (password !== password_confirmation) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }
        try {
            const response = await register(nombre, apellido, email, password, password_confirmation, DUI, tipo);

            if (response.message === "Registro exitoso, verifica tu correo electrónico para activar tu cuenta") {
                // Si la respuesta es exitosa, redirigir al usuario a la página de inicio
                alert("Registro exitoso. Verifica tu correo electrónico para activar tu cuenta.");
                navigate('/login'); // Redirige a la página de inicio de sesión
            }

        } catch (error) {
            console.error("Error al registrarse:", error);
            setError(error.message || "Error al registrarse. Intente de nuevo.");
        } finally {
            setLoading(false); // Finaliza el loading después de la respuesta
        }
    };


    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-lg rounded-3 w-100" style={{ maxWidth: '900px' }}>
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-x-circle-fill me-2"></i>
                                {error}
                            </div>
                        )}
                        {loading && (
                            <div className="alert alert-info d-flex align-items-center" role="alert">
                                <i className="bi bi-hourglass-split me-2"></i>
                                Procesando...
                            </div>
                        )}
                        <div className="d-flex flex-md-row flex-column align-items-center">
                            {/* Imagen */}
                            <div className="text-center p-3">
                                <img src={img_NewUser} alt="Usuario" className="img-fluid mb-3" style={{ width: '120px', height: '120px' }} />
                                <h2 style={{ fontSize: '1.8rem' }}>Regístrate</h2>
                            </div>

                            {/* Formulario */}
                            <div className="w-100 p-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="nombre" className="form-label">Nombre</label>
                                            <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="apellido" className="form-label">Apellido</label>
                                            <input type="text" className="form-control" id="apellido" placeholder="Ingrese su apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} disabled={loading} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                                            <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dui" className="form-label">DUI</label>
                                            <input type="text" className="form-control" id="dui" placeholder="Ingrese su DUI" value={DUI} onChange={(e) => setDUI(e.target.value)} disabled={loading} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="password" className="form-label">Contraseña</label>
                                            <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="passwordConfirm" className="form-label">Confirmar contraseña</label>
                                            <input type="password" className="form-control" id="passwordConfirm" placeholder="Confirme su contraseña" value={password_confirmation} onChange={(e) => setPassword_Confirmation(e.target.value)} disabled={loading} />
                                        </div>
                                    </div>

                                    {/* Botón de registro */}
                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-success w-100">
                                            {loading ? (
                                                <>
                                                    <i className="bi bi-arrow-repeat me-2 spin"></i> Procesando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-plus-fill me-2"></i>
                                                    Registrarse
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <p className="text-center mt-3">
                                    ¿Ya tienes cuenta? <a type="button" className="text-decoration-none text-primary" onClick={() => navigate("/login")}>Iniciar sesión</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Register;