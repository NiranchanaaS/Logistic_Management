import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HomePage.css';
import logo from './logo.png'; // Update the path to your logo image

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen] = useState(false);
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

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleLearnMoreClick = () => {
    navigate('/learn-more'); 
  };

  const handleTrackOrderClick = () => {
    navigate('/track'); 
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
            <img src={logo} alt="Logo" className="logo" />
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
          <nav className="main-nav">
            <button className="nav-button" onClick={() => navigate('/')}>Home</button>
            <button className="nav-button" onClick={() => navigate('/about')}>About</button>
            <button className="nav-button" onClick={() => navigate('/services')}>Services</button>
            <button className="nav-button" onClick={() => navigate('/track')}>Track Goods</button>
            <button className="nav-button" onClick={() => navigate('/contact')}>Contact</button>
            <button className="nav-button" onClick={() => navigate('/blog')}>Blog</button>
            {user && (
              <button className="nav-button" onClick={() => navigate('/user_dashboard')}>Dashboard</button>
            )}
          </nav>
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
            <div className="intro-image">
              <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/home/Envia_Map_Loop_en.webp" alt="Intro" />
            </div>
            <div className="intro-content">
              <p className="intro-text">
                <span className="custom-text">The Best Domestic and International Shipping Solution for your Business</span>
                <br />
                Buy shipping services for envelopes, boxes, and pallets. Use advanced features like e-commerce integration, multi-shipment handling, customized tracking pages, and more to streamline your shipping.
              </p>
              <button className="learn-more-button" onClick={handleLearnMoreClick}>LEARN ABOUT US</button>
              <button className="track-order-button" onClick={handleTrackOrderClick}>TRACK ORDER</button>
            </div>
          </div>
          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-item">
              <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/home/company-icon.svg" alt="Companies Icon" className="stats-icon" />
              <p className="stats-text"><b>20,000+ Companies</b><br />Trust their logistics to us</p>
            </div>
            <div className="stats-item">
              <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/home/shipments-icon.svg" alt="Shipments Icon" className="stats-icon" />
              <p className="stats-text"><b>1M+ Shipments</b><br />Handled monthly</p>
            </div>
            <div className="stats-item">
              <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/home/carriers-icon.svg" alt="Carriers Icon" className="stats-icon" />
              <p className="stats-text"><b>100+ Carriers</b><br />Integrated with envia.com</p>
            </div>
          </div>
          {/* Required Features Section */}
          <section className="required-feature-section">
            <div className="required-feature-item">
              <h3>Import Request</h3>
              <p>Manage your import requests efficiently with our easy-to-use interface.</p>
              <button onClick={() => navigate('/import')}>Go to Import</button>
            </div>
            <div className="required-feature-item">
              <h3>Export Request</h3>
              <p>Handle your export requests seamlessly with our comprehensive tools.</p>
              <button onClick={() => navigate('/export')}>Go to Export</button>
            </div>
            <div className="required-feature-item">
              <h3>Warehouse Management</h3>
              <p>Optimize your warehouse operations with our advanced management features.</p>
              <button onClick={() => navigate('/warehouse')}>Go to Warehouse</button>
            </div>
            <div className="required-feature-item">
              <h3>Transport Solutions</h3>
              <p>Enhance your transport logistics with our effective solutions.</p>
              <button onClick={() => navigate('/transport')}>Go to Transport</button>
            </div>
          </section>

          {/* Carriers Section */}
          <div className="carriers-section">
            <h2>Our Global Partners</h2>
            <div className="country-buttons">
              <button className="country-button">USA</button>
              <button className="country-button">Germany</button>
              <button className="country-button">China</button>
              <button className="country-button">India</button>
            </div>
            <div className="line"></div>
            <div className="carriers-list">
              <div className="carrier-item">
                <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/logos/carriers/amazon.svg" alt="Carrier 1" className="carrier-logo" />
                <p><b>AMAZON SHIPPING</b></p>
              </div>
              <div className="carrier-item">
                <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/logos/carriers/dhl.svg" alt="Carrier 2" className="carrier-logo" />
                <p><b>DHL EXPRESS</b></p>
              </div>
              <div className="carrier-item">
                <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/logos/carriers/ekart.svg" alt="Carrier 3" className="carrier-logo" />
                <p><b>eKart</b></p>
              </div>
              <div className="carrier-item">
                <img src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/logos/carriers/delhivery.svg" alt="Carrier 4" className="carrier-logo" />
                <p><b>Delhivery</b></p>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer-bar">
          <div className="footer-links">
            <div className="footer-section">
              <h3>FAQ</h3>
              <a href="/faq/shipping">Shipping</a>
              <a href="/faq/payment">Payment</a>
              <a href="/faq/order">Order</a>
            </div>
            <div className="footer-section">
              <h3>Resources</h3>
              <a href="/resources/blog">Blog</a>
              <a href="/resources/guides">Guides</a>
              <a href="/resources/case-studies">Case Studies</a>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <a href="/about">About Us</a>
              <a href="/careers">Careers</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Swift Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
