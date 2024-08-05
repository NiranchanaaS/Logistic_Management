import React from 'react';
import './AdminPortal.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Shipments Overview</h3>
          <div className="chart">"Efficient shipment management is crucial for maintaining a seamless supply chain and ensuring timely delivery of goods to customers."</div>
        </div>
        <div className="widget">
          <h3>Recent Activities</h3>
          <div className="activities">
            <ul>
              <li>Shipment ID 101 - Delivered</li>
              <li>Shipment ID 102 - In Transit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
