import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your admin authentication logic here
    if (adminId && name && password) {
      // Navigate to the admin dashboard or home page on successful login
      navigate('/admin-portal');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label htmlFor="admin-id">Admin ID:</label>
        <input
          type="text"
          id="admin-id"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/admin-register')} className="register-button">Register as Admin</button>
      </div>
    </div>
  );
}

export default AdminLogin;
