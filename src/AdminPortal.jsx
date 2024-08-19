import React from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './AdminPortal.css';
import profileIcon from './profile-icon.png'; // Replace with your profile icon path
import largeLogo from './large-logo.png'; // Replace with your large logo path
import ManageShipments from './ManageShipments'; // Replace with your actual component
import ManageUsers from './ManageUsers'; // Replace with your actual component
import Reports from './Reports'; // Replace with your actual component
import AdminDashboard from './AdminDashboard';

function AdminPortal() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const adminId = localStorage.getItem('adminId'); // Retrieve the admin ID

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('adminId'); // Optionally remove admin ID
    navigate('/adminlogin');
  };

  if (!isLoggedIn) {
    navigate('/adminlogin');
    return null; // Optionally render a loading state or redirect message
  }

  return (
    <div className="admin-portal-container">
      <nav className="admin-nav">
        <div className="nav-left">
          <h1>Admin Portal</h1>
        </div>
        <div className="nav-right">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="sidebar-nav">
            <Link to="/admin-dashboard" className="active">Dashboard</Link>
            <Link to="/manage-shipments">Manage Shipments</Link>
            <Link to="/manage-users">Manage Users</Link>
            <Link to="/reports">Reports</Link>
          </div>
        </div>
        <div className="admin-main-content">
          <div className="welcome-section">
            <img src={largeLogo} alt="Large Logo" className="large-logo" />
            <h2>Welcome, Admin {adminId}</h2> {/* Display admin ID in the welcome message */}
          </div>
          <div className="admin-content">
            <Routes>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-shipments" element={<ManageShipments />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;
