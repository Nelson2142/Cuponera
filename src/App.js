import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import EmailPassword from './components/EmailPassword';
import ChangePassword from './components/ChangePassword';

function App() {

  return (

    <Router> {/*Rutas que podemos visitar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-password" element={<EmailPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* Ruta para la página de inicio */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
