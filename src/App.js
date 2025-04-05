import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useLogin from './hooks/useLogin';
import Home from './components/Home';

function App() {

  const { user, isVerified, login, logout } = useLogin(); // Hook para el login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {
        <Home logout={logout} user={user} isVerified={isVerified} login={login} />
      }
    </>
  );
}

export default App;
