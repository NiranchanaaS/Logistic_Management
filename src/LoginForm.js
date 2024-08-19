import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'login-body';

    return () => {
      document.body.className = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !company) {
      setError('Please enter username, password, and company name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users?username=${username}&password=${password}&company=${company}`);
      const users = await response.json();

      if (users.length > 0) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/home', { state: { user: users[0] } }); // Pass user data to home page
        }, 2000);
      } else {
        setError('Invalid username, password, or company name.');
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {success && <div className="success-message">Login Successful!</div>}
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button 
  type="submit" 
  className="submit-button" 
  style={{ 
    // backgroundColor: '#d9534f', 
    backgroundColor: '#1197a0',
    color: '#fff', 
    padding: '0.75rem', 
    border: 'none', 
    borderRadius: '4px', 
    fontSize: '1rem', 
    cursor: 'pointer', 
    width: '100%', 
    boxShadow:'1190a1',
    transition: 'background-color 0.3s ease' 
  }}>
  Login
</button>

      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginForm;
