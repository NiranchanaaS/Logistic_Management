import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPortal.css'; // Ensure you import the CSS file

function Sidebar() {
  return (
    <div className="navbar">
      <h2>Admin Portal</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/manage-shipments">Manage Shipments</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
