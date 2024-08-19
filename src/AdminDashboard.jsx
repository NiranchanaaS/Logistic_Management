import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeBox, setActiveBox] = useState(null);

  // Example list of active users
  const activeUsers = ['User A', 'User B', 'User C', 'User D', 'User E'];

  const handleBoxClick = (boxName) => {
    setActiveBox(boxName === activeBox ? null : boxName);
  };

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className={`stat-box ${activeBox === 'total-shipments' ? 'active' : ''}`} onClick={() => handleBoxClick('total-shipments')}>
          <h3>Total Shipments</h3>
          <p className="stat-value">12,345</p>
          {activeBox === 'total-shipments' && (
            <ul className="stat-details">
              <li>Shipment A</li>
              <li>Shipment B</li>
              <li>Shipment C</li>
            </ul>
          )}
        </div>
        <div className={`stat-box ${activeBox === 'pending-shipments' ? 'active' : ''}`} onClick={() => handleBoxClick('pending-shipments')}>
          <h3>Pending Shipments</h3>
          <p className="stat-value">456</p>
          {activeBox === 'pending-shipments' && (
            <ul className="stat-details">
              <li>Pending A</li>
              <li>Pending B</li>
              <li>Pending C</li>
            </ul>
          )}
        </div>
        <div className={`stat-box ${activeBox === 'delivered-shipments' ? 'active' : ''}`} onClick={() => handleBoxClick('delivered-shipments')}>
          <h3>Delivered Shipments</h3>
          <p className="stat-value">11,789</p>
          {activeBox === 'delivered-shipments' && (
            <ul className="stat-details">
              <li>Delivered A</li>
              <li>Delivered B</li>
              <li>Delivered C</li>
            </ul>
          )}
        </div>
        <div className={`stat-box ${activeBox === 'active-users' ? 'active' : ''}`} onClick={() => handleBoxClick('active-users')}>
          <h3>Active Users</h3>
          <p className="stat-value">789</p>
          {activeBox === 'active-users' && (
            <ul className="stat-details">
              {activeUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* New section for statistical reports */}
      <div className="statistical-reports">
        <h2>Statistical Reports</h2>
        <div className="report-box">
          <h3>Revenue</h3>
          <p className="report-value">$1,234,567</p>
        </div>
        <div className="report-box">
          <h3>Top Locations</h3>
          <ul className="report-details">
            <li>Location A</li>
            <li>Location B</li>
            <li>Location C</li>
          </ul>
        </div>
        <div className="report-box">
          <h3>Shipment Trends</h3>
          <p className="report-value">Increasing</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
