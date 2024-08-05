import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HomePage.css';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.className = 'home-body'; 

    if (location.state && location.state.user) {
      setUser(location.state.user); // Set the user from the navigation state
    }

    return () => {
      document.body.className = ''; 
    };
  }, [location.state]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLearnMoreClick = () => {
    navigate('/learn-more'); 
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="home-body">
      <div className="top-image"></div>
      <div className="home-container">
        <header className="home-header">
          <div className="nav-bar">
            <span className="menu-icon" onClick={toggleDropdown}>&#9776;</span>
            {user ? (
              <div className="profile-section">
                <span>Welcome, {user.username}</span>
                <button className="nav-button" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
                <button className="nav-button" onClick={() => navigate('/register')}>Sign Up</button>
                <button className="nav-button admin-login-button" onClick={() => navigate('/adminlogin')}>Admin Login</button>
              </>
            )}
          </div>
          <h1>"The line between disorder and order lies in logistics." - Sun Tzu</h1>
          <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            <button className="nav-button" onClick={() => navigate('/')}>Home</button>
            <button className="nav-button" onClick={() => navigate('/settings')}>Settings</button>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
            <button className="nav-button" onClick={() => window.location.href = 'mailto:info@swiftlogistics.com'}>Email Us</button>
            <button className="nav-button" onClick={() => navigate('/contact')}>Contact Us</button>
          </div>
        </header>
        <main className="main-content">
          <div className="intro-section">
            <p className="intro-text">
              Logistics management encompasses the planning, implementation, and control of the efficient movement and storage of goods, services, and information from the point of origin to the point of consumption. It aims to meet customer requirements while minimizing costs and optimizing resources.
            </p>
            <button className="learn-more-button" onClick={handleLearnMoreClick}>Learn More</button>
          </div>
          
          {/* New section with navigating boxes */}
          <section className="navigation-section">
            <div className="nav-box" onClick={() => navigate('/import')}>
              <h2>Import</h2>
            </div>
            <div className="nav-box" onClick={() => navigate('/export')}>
              <h2>Export</h2>
            </div>
            <div className="nav-box" onClick={() => navigate('/warehouse')}>
              <h2>Warehouse</h2>
            </div>
            <div className="nav-box" onClick={() => navigate('/transport')}>
              <h2>Transport</h2>
            </div>
          </section>
          
          {/* Updated section for shipment tracking */}
          <section className="track-shipment-section">
            <button className="track-shipment-button" onClick={() => navigate('/track')}>
              Track Your Shipment
            </button>
          </section>
          
        </main>
        <footer className="footer-bar">
          <div className="footer-links">
            <div className="footer-section">
              <h3>Quick Access</h3>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact Us</a>
              <a href="#" onClick={() => window.location.href = 'mailto:info@swiftlogistics.com'}>Email Us</a>
            </div>
            <div className="footer-section">
              <h3>FAQ</h3>
              <a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }}>Frequently Asked Questions</a>
              <a href="/support" onClick={(e) => { e.preventDefault(); navigate('/support'); }}>Support</a>
            </div>
            <div className="footer-section">
              <h3>Legal</h3>
              <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>Privacy Policy</a>
              <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>Terms and Conditions</a>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <a href="#" onClick={() => window.location.href = 'mailto:info@swiftlogistics.com'}>Email Us</a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact Form</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
