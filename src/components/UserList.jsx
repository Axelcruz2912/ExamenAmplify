import React from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';

const UserList = ({ users, onDelete }) => {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Lista de usuarios</h2>
        <Link to="/create" className="btn-create">Crear Nuevo Usuario</Link>
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="btn edit">Editar</Link>
                  <button onClick={() => onDelete(user.id)} className="btn delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
