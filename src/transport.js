import React, { useState, useEffect } from 'react';
import './transport.css';

function TransportPage() {
  const [transportSchedule, setTransportSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem('transportSchedule');
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  });

  const [formData, setFormData] = useState({
    id: '',
    transportMode: '',
    departureDate: '',
    arrivalDate: '',
    origin: '',
    destination: '',
    status: 'Scheduled',
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('transportSchedule', JSON.stringify(transportSchedule));
  }, [transportSchedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.transportMode && formData.departureDate && formData.arrivalDate && formData.origin && formData.destination) {
      const newTransport = { ...formData, id: Date.now() };
      setTransportSchedule([...transportSchedule, newTransport]);
      setFormData({
        id: '',
        transportMode: '',
        departureDate: '',
        arrivalDate: '',
        origin: '',
        destination: '',
        status: 'Scheduled',
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = (id) => {
    setTransportSchedule(transportSchedule.filter(item => item.id !== id));
  };

  const filteredSchedule = transportSchedule.filter(item =>
    item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="transport-page">
      <header className="transport-header">
        <h1>Transport Scheduling</h1>
      </header>
      <main className="transport-main-content">
        <section className="transport-intro">
          <h2>Schedule Transportation</h2>
          <input
            type="text"
            placeholder="Search by origin or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <div className="transport-list">
            <table>
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map(item => (
                    <tr key={item.id}>
                      <td>{item.transportMode}</td>
                      <td>{item.departureDate}</td>
                      <td>{item.arrivalDate}</td>
                      <td>{item.origin}</td>
                      <td>{item.destination}</td>
                      <td>{item.status}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No scheduled transport found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="transport-form">
          <h2>New Transport Request</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="transportMode">Transport Mode:</label>
            <input
              type="text"
              id="transportMode"
              name="transportMode"
              value={formData.transportMode}
              onChange={handleChange}
              required
            />
            <label htmlFor="departureDate">Departure Date:</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
            <label htmlFor="arrivalDate">Arrival Date:</label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
            <label htmlFor="origin">Origin:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
            <button type="submit">Schedule Transport</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default TransportPage;
