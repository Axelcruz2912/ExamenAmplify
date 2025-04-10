import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ onSubmit, isEdit }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      const fetchUser = async () => {
        const response = await axios.get(`http://3.141.46.57/usuarios/${id}`);
        setUserData({
          nombre: response.data.nombre,
          correo: response.data.correo,
          contrasena: ''
        });
      };
      fetchUser();
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onSubmit(id, userData);
    } else {
      onSubmit(userData);
    }
    navigate('/');
  };

  return (
    <div className="user-form-container">
      <div className="user-form-card">
        <h2>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h2>

        <form onSubmit={handleSubmit} className="user-form">
          <label>Nombre</label>
          <input
            type="text"
            value={userData.nombre}
            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
            required
          />

          <label>Correo</label>
          <input
            type="email"
            value={userData.correo}
            onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
            required
          />

          {!isEdit && (
            <>
              <label>Contraseña</label>
              <input
                type="password"
                value={userData.contrasena}
                onChange={(e) => setUserData({ ...userData, contrasena: e.target.value })}
                required
              />
            </>
          )}

          <button type="submit" className="btn-submit">
            {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
