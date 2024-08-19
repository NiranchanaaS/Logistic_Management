import React, { useState } from 'react';
import './contact.css'; // Import the CSS file for styling

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!name || !email || !message) {
      setError('Please fill out all fields.');
      return;
    }
    
    // Log the data to the console (or send it to an API)
    console.log({ name, email, message });

    // Clear the form fields
    setName('');
    setEmail('');
    setMessage('');
    setError('');
    
    alert('Your message has been sent!');
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
          />
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default ContactPage;
