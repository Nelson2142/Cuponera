import React, { use } from 'react';
import Oferts from './Oferts';
import useOferts from "../hooks/useOferts";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";
import useLogin from "../hooks/useLogin"; // Importar la función de cierre de sesión
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Coupons from './Coupons';
import useCoupons from '../hooks/useCoupons';

const Home = () => {
    const { oferts, getOferts } = useOferts(); // Hook para obtener ofertas
    const { getCoupons } = useCoupons();
    const navigate = useNavigate(); //navegación entre rutas
    const { user, isVerified } = useAuth(); // Hook para verificar el estado del usuario
    const { logout } = useLogin(); // Hook para cerrar sesión
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [selectedView, setSelectedView] = useState(1);

    useEffect(() => {
        // Llama a la función para obtener ofertas al cargar el componente
    }, []) // solamente se ejecuta cuando oferts y coupons cambian

    useEffect(() => {
        getOferts();

        {/*obtener cupones cuando hay un usuario */ }
        const UserData = localStorage.getItem("user")
        if (UserData && user && isVerified) {
            const userObj = JSON.parse(UserData)
            const cliente_id = userObj.id
            getCoupons(cliente_id);
        }
    }, [user, isVerified])

    const handleLogout = async () => {
        try {
            await logout(); // Llama a la función de cierre de sesión
            setSelectedView(1);
            navigate('/'); // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setShowModal(false); // Cierra el modal si está abierto
        }
    }


    return (
        <>
            <Tabs selectedIndex={selectedView} onSelect={setSelectedView}>
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
                                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Bienvenido usuario {user.nombre}</h5>
                                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                            <TabList className="nav flex-column">
                                                <Tab className="nav-link text-white" selectedClassName="active">
                                                    <i className="bi bi-ticket-perforated"></i> Mis Cupones
                                                </Tab>
                                                <Tab className="nav-link text-white" selectedClassName="active">
                                                    <i className="bi bi-tags"></i> Ofertas
                                                </Tab>
                                            </TabList>
                                            <hr />
                                            <button className="nav-link btn btn-link text-danger" onClick={() => setShowModal(true)}>
                                                <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : ( //si el usuario no esta logeado o no verificado
                                <>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-success" onClick={() => navigate('/login')}><i className="bi bi-box-arrow-in-right"></i> Iniciar sesión</button>
                                    </div>

                                </>
                            )
                        }
                    </div>
                </nav>

                {/* Modal de confirmación de cierre de sesión */}
                {showModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Cerrar sesión</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">¿Estás seguro que deseas cerrar sesión?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        <i className="bi bi-x"></i> Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTENIDO DE TABS */}
                <div className="mt-5 pt-4">
                    <TabPanel>
                        <Coupons />
                    </TabPanel>
                    <TabPanel>
                        <Oferts oferts={oferts} user={user} isVerified={isVerified} />
                    </TabPanel>
                </div>
            </Tabs>
        </>

    );
}

export default Home;