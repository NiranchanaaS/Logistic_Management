import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css'; // Import the CSS file

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState(''); // New state
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTransportModes, setSelectedTransportModes] = useState([]);
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTransportModeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTransportModes(prev => 
      checked 
        ? [...prev, value] 
        : prev.filter(mode => mode !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!username || !password || !reenterPassword || !companyName || !firstName || !lastName || !email || !userType) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== reenterPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Prepare user data
    const userData = {
      username,
      password,
      companyName,
      firstName,
      lastName,
      email,
      selectedTransportModes,
      userType
    };

    try {
      // Post data to the mock API
      await axios.post('http://localhost:8080/users', userData);
      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error saving data', error);
      setError('An error occurred while saving data.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Mode of Transport:</label>
          <div className="checkbox-group">
            {['LCL', 'FCL', 'FTL', 'AIR', 'RAIL', 'OTHERS'].map(mode => (
              <div key={mode}>
                <input
                  type="checkbox"
                  id={mode}
                  value={mode}
                  checked={selectedTransportModes.includes(mode)}
                  onChange={handleTransportModeChange}
                />
                <label htmlFor={mode}>{mode}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="importer">Importer</option>
            <option value="exporter">Exporter</option>
            <option value="transportProvider">Transport Provider</option>
            <option value="techCompany">Tech Company</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reenterPassword">Re-enter Password:</label>
          <input
            type="password"
            id="reenterPassword"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            placeholder="Re-enter Password"
          />
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
