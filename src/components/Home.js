import React, { useState, useEffect } from 'react';
import Oferts from './Oferts';
import ComprarCupon from './ComprarCupon';
import MisCupones from './MisCupones';
import useOferts from "../hooks/useOferts";

const Home = ({ logout, user, isVerified, login }) => {
    const { oferts, getOferts } = useOferts();
    const [vista, setVista] = useState("inicio");
    const [cuponSeleccionado, setCuponSeleccionado] = useState(null);

    // 🚨 USUARIO DE PRUEBA TEMPORAL
    const usuarioTemporal = {
        id: 1,
        nombre: "Usuario Prueba",
        email: "nelsonrt04@gmail.com"
    };

    const usuarioActivo = user || usuarioTemporal; // 💡 usamos esto para mostrar el botón siempre

    useEffect(() => {
        getOferts();
    }, []);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">La cuponera || Don Bosco</a>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-info"
                            onClick={() => setVista("mis_cupones")}
                        >
                            Mis cupones
                        </button>

                        {
                            user && isVerified ? (
                                <>
                                    <span className="text-white">Hola, {user.nombre}</span>
                                    <button onClick={logout} className="btn btn-danger">
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-success">Iniciar sesión</button>
                                    <button className="btn btn-warning">Regístrate</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>

            {
                vista === "inicio" ? (
                    <Oferts
                        oferts={oferts}
                        setVista={setVista}
                        setCuponSeleccionado={setCuponSeleccionado}
                    />
                ) : vista === "comprar" ? (
                    <ComprarCupon
                        cupon={cuponSeleccionado}
                        setVista={setVista}
                        user={usuarioActivo} // 💡 usamos temporal si no hay login
                    />
                ) : vista === "mis_cupones" ? (
                    <MisCupones
                        user={usuarioActivo}
                        setVista={setVista}
                    />
                ) : null
            }
        </>
    );
};

export default Home;
