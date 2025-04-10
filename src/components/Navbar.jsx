import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, userName, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Gestión de Usuarios</div>
      {isAuthenticated && (
        <div className="navbar-content">
          <span className="navbar-user">Hola, {userName}</span>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/create" className="nav-link">Crear Usuario</Link>
          <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
