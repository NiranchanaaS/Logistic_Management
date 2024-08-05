import React from 'react';
import './Shipment.css';

const ShipmentDetails = () => {
  return (
    <div className="shipment-details-container">
      <header className="page-header">
        <h1>Shipment Details</h1>
      </header>
      <main className="shipment-details-body">
        <section className="details-section">
          <h2>Tracking Number: 123456789</h2>
          <p>Status: In Transit</p>
          <p>Estimated Delivery: 3 days</p>
          <p>Origin: Warehouse A</p>
          <p>Destination: Customer B</p>
        </section>
      </main>
      <footer className="page-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShipmentDetails;
