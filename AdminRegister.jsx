import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Function to generate a unique Admin ID
  const generateAdminId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `ADMIN-${timestamp}-${randomNum}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (name && email && password) {
        const newAdminId = generateAdminId(); // Generate the Admin ID

        // Display the generated Admin ID in a popup message
        alert(`Registration successful! Your Admin ID is: ${newAdminId}`);

        // Navigate to the admin login page on successful registration
        navigate('/adminlogin');
      } else {
        alert('Please fill in all fields');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Register as Admin</h2>
      <form className="admin-register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;
