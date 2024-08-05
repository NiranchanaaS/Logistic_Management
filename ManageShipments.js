import React, { useState } from 'react';
import './AdminPortal.css';

function ManageShipments() {
  const [shipments, setShipments] = useState([
    { id: 1, origin: 'New York', destination: 'Los Angeles', status: 'In Transit' },
    { id: 2, origin: 'Chicago', destination: 'Miami', status: 'Delivered' },
  ]);

  return (
    <div className="manage-shipments">
      <h2>Manage Shipments</h2>
      <button onClick={() => setShipments([...shipments, { id: shipments.length + 1, origin: 'San Francisco', destination: 'Seattle', status: 'Pending' }])}>Add Shipment</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.origin}</td>
              <td>{shipment.destination}</td>
              <td>{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 
}

export default ManageShipments;
