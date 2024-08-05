import React from 'react';
import { useNavigate } from 'react-router-dom';
import './track.css';

function TrackShipment() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/shipment');
  };

  return (
    <div className="track-shipment-body">
      <section className="track-shipment-section">
        <h2>Track Your Shipment</h2>
        <form className="track-shipment-form" onSubmit={handleSubmit}>
          <label htmlFor="tracking-number">Enter Tracking Number:</label>
          <input 
            type="text" 
            id="tracking-number" 
            name="tracking-number" 
            placeholder="Enter tracking number" 
            required
          />
          <button type="submit">Track</button>
        </form>
      </section>
    </div>
  );
}

export default TrackShipment;
