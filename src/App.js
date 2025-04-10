// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  const API_URL = 'http://3.141.46.57';

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const nombre = localStorage.getItem('user_name');
  
    if (token && nombre) {
      setIsAuthenticated(true);
      setUserName(nombre);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.status === 200) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_name', response.data.nombre); // Guardar nombre
        setIsAuthenticated(true);
        setUserName(response.data.nombre); // Actualizar estado global
        fetchUsers();
      }
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    setIsAuthenticated(false);
    setUserName('');
  };
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

  const createUser = async (userData) => {
    try {
      await axios.post(`${API_URL}/usuarios`, userData);
      fetchUsers();
    } catch (error) {
      console.error('Error al crear el usuario', error);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await axios.put(`${API_URL}/usuarios/${id}`, userData);
      fetchUsers();
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={
          isAuthenticated ?
            <UserList users={users} onDelete={deleteUser} /> :
            <Navigate to="/login" />
        } />
        <Route path="/login" element={
          isAuthenticated ?
            <Navigate to="/" /> :
            <Login onLogin={handleLogin} />
        } />
        <Route path="/create" element={
          <UserForm onSubmit={createUser} />
        } />
        <Route path="/edit/:id" element={
          isAuthenticated ?
            <UserForm onSubmit={updateUser} isEdit /> :
            <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
