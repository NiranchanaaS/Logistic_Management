import React, { useState } from 'react';
import './export.css'; // Import your CSS file for styling

function ExportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    destination: '',
    quantity: '',
    transportMode: '',
    productDescription: '',
    estimatedValue: '',
    complianceDocuments: null,
    preferredShippingDate: '',
    incoterms: '',
    specialInstructions: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Export request submitted successfully!');
    // Handle form submission logic here
    document.getElementById('request-section').innerHTML = `
      <h2>Request Details</h2>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Company:</strong> ${formData.company}</li>
        <li><strong>Destination:</strong> ${formData.destination}</li>
        <li><strong>Quantity:</strong> ${formData.quantity}</li>
        <li><strong>Transport Mode:</strong> ${formData.transportMode}</li>
        <li><strong>Product Description:</strong> ${formData.productDescription}</li>
        <li><strong>Estimated Value:</strong> ${formData.estimatedValue}</li>
        <li><strong>Preferred Shipping Date:</strong> ${formData.preferredShippingDate}</li>
        <li><strong>Incoterms:</strong> ${formData.incoterms}</li>
        <li><strong>Special Instructions:</strong> ${formData.specialInstructions}</li>
      </ul>
    `;
  };

  return (
    <div className="export-page">
      <header className="export-header">
        <h1>Export Logistics Management</h1>
      </header>
      <main className="export-main-content">
        <section className="export-intro">
          <h2>About Export Logistics</h2>
          <p>
            Export logistics is crucial for managing the movement of goods from a country to international destinations. It involves planning, coordination, and execution of the export process, ensuring compliance with international regulations and optimizing delivery times. Our export services aim to streamline your international shipments and enhance efficiency.
          </p>
        </section>
        <section className="export-request-form">
          <h2>Export Services</h2>
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
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
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
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
            />
            <label htmlFor="estimatedValue">Estimated Value:</label>
            <input
              type="text"
              id="estimatedValue"
              name="estimatedValue"
              value={formData.estimatedValue}
              onChange={handleChange}
              required
            />
            <label htmlFor="complianceDocuments">Compliance Documents:</label>
            <input
              type="file"
              id="complianceDocuments"
              name="complianceDocuments"
              onChange={handleChange}
              required
            />
            <label htmlFor="preferredShippingDate">Preferred Shipping Date:</label>
            <input
              type="date"
              id="preferredShippingDate"
              name="preferredShippingDate"
              value={formData.preferredShippingDate}
              onChange={handleChange}
              required
            />
            <label htmlFor="incoterms">Incoterms:</label>
            <input
              type="text"
              id="incoterms"
              name="incoterms"
              value={formData.incoterms}
              onChange={handleChange}
              required
            />
            <label htmlFor="specialInstructions">Special Instructions:</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              required
            />
            <button type="submit">SEND INFO</button>
          </form>
        </section>
        <section id="request-section" className="export-request-section">
          {/* Request details will be injected here */}
        </section>
        <section className="export-dummy-data">
          <h2>Recent Export Shipments</h2>
          <ul>
            <li>Shipment #54321 - Furniture to Italy</li>
            <li>Shipment #98765 - Toys to USA</li>
            <li>Shipment #43210 - Chemicals to Brazil</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ExportPage;
