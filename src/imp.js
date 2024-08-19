import React, { useState } from 'react';
import './Import.css'; // Import your CSS file for styling

function ImportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    shipmentDetails: '',
    quantity: '', // New field
    transportMode: '', // New field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Import request submitted successfully!');
    // Handle form submission logic here
    document.getElementById('request-section').innerHTML = `
      <h2>Request Details</h2>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Company:</strong> ${formData.company}</li>
        <li><strong>Shipment Details:</strong> ${formData.shipmentDetails}</li>
        <li><strong>Quantity:</strong> ${formData.quantity}</li>
        <li><strong>Transport Mode:</strong> ${formData.transportMode}</li>
      </ul>
    `;
  };

  return (
    <div className="import-page">
      <header className="import-header">
        <h1>Import Logistics Management</h1>
      </header>
      <main className="import-main-content">
        <section className="import-intro">
          <h2>About Import Logistics</h2>
          <p>
            Import logistics involves the planning and management of goods that are brought into a country. It encompasses everything from transportation to customs clearance, ensuring that goods arrive efficiently and in compliance with regulations. Our import logistics services streamline the process, saving you time and resources.
          </p>
        </section>
        <section className="import-request-form">
          <h2>Request Import Services</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <label htmlFor="shipmentDetails">Shipment Details:</label>
            <textarea
              id="shipmentDetails"
              name="shipmentDetails"
              value={formData.shipmentDetails}
              onChange={handleChange}
              required
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <label htmlFor="transportMode">Transport Mode:</label>
            <select
              id="transportMode"
              name="transportMode"
              value={formData.transportMode}
              onChange={handleChange}
              required
            >
              <option value="">Select Mode</option>
              <option value="air">Air</option>
              <option value="sea">Sea</option>
              <option value="land">Land</option>
            </select>
            <button type="submit">Submit Request</button>
          </form>
        </section>
        <section id="request-section" className="import-request-section">
          {/* Request details will be injected here */}
        </section>
        <section className="import-dummy-data">
          <h2>Recent Import Shipments</h2>
          <ul>
            <li>Shipment #12345 - Electronics from China</li>
            <li>Shipment #67890 - Clothing from Bangladesh</li>
            <li>Shipment #11121 - Machinery from Germany</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ImportPage;
