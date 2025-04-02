import React from 'react';
import Oferts from './Oferts';
import useOferts from "../hooks/useOferts";
import { useEffect } from 'react';

const Home = ({ logout, user, isVerified, login }) => {
    const { oferts, getOferts } = useOferts(); // Hook para obtener ofertas

    useEffect(() => {
        getOferts(); // Llama a la función para obtener ofertas al cargar el componente
    }, []) // Llama a la función para obtener ofertas al cargar el componente

    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">La cuponera || Don Bosco</a>
                    {
                        user && isVerified ? ( //verificar si el usuario esta logeado y verificado
                            <>
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Link</a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Dropdown
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-dark">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <form className="d-flex mt-3" role="search">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-success" type="submit">Search</button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : ( //si el usuario no esta logeado o no verificado
                            <>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-success"><i className="bi bi-box-arrow-in-right"></i> Iniciar sesión</button>
                                    <button type="button" className="btn btn-warning"><i className="bi bi-pencil-square"></i> Regístrate</button>
                                </div>

                            </>
                        )
                    }
                </div>
            </nav>
            <Oferts oferts = {oferts}/> {/* Componente de Ofertas */}
        </>

    );
}

export default Home;