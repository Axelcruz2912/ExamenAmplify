// src/components/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Importa tu hoja de estilos

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contrasena: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Acceso al Sistema</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={credentials.correo}
            onChange={(e) => setCredentials({ ...credentials, correo: e.target.value })}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={credentials.contrasena}
            onChange={(e) => setCredentials({ ...credentials, contrasena: e.target.value })}
            required
          />

          <button type="submit" className="btn-login">Iniciar Sesión</button>

          <hr />

          <Link to="/create" className="btn-register">Crear cuenta nueva</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
