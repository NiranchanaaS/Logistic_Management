import React, { useState, useEffect } from 'react';
import './track.css';

function TrackShipment() {
  const [trackingID, setTrackingID] = useState('');
  const [shipment, setShipment] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all shipments to display statistics or handle as necessary
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:8080/shipments');
        if (response.ok) {
          const data = await response.json();
          setShipments(data);
        } else {
          throw new Error('Failed to fetch shipments');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchShipments();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/shipments?trackingID=${trackingID}`);
      if (response.ok) {
        const data = await response.json();
        setShipment(data[0]); // Assuming response is an array
        setError(null);
      } else {
        throw new Error('Shipment not found');
      }
    } catch (err) {
      setError(err.message);
      setShipment(null);
    }
  };

  return (
    <div className="track-shipment-body">
      <section className="track-shipment-section">
        <h2>Track Your Shipment</h2>
        <div className="my-search-container">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
          />
          <button onClick={handleSearch}>Track</button>
        </div>
        <section className="my-shipment-details">
          {shipment ? (
            <div className="my-shipment-info">
              <h3>Shipment Details</h3>
              <p><strong>Tracking ID:</strong> {shipment.trackingID}</p>
              <p><strong>Origin:</strong> {shipment.origin.address1}, {shipment.origin.city}</p>
              <p><strong>Destination:</strong> {shipment.destination.address1}, {shipment.destination.city}</p>
              <p><strong>Content:</strong> {shipment.pallet.content}</p>
              <p><strong>Declared Value:</strong> {shipment.pallet.declaredValue}</p>
              <p><strong>Quantity:</strong> {shipment.pallet.quantity}</p>
              <p><strong>Weight:</strong> {shipment.pallet.weight} KG</p>
            </div>
          ) : (
            <p>No shipment details available. Please search by tracking ID.</p>
          )}
          {error && <p className="my-error-message">{error}</p>}
        </section>
      </section>
    </div>
  );
}

export default TrackShipment;
