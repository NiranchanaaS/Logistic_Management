import React from 'react';
import './LearnMorePage.css'; // Import the CSS file for styling

const LearnMorePage = () => {
  return (
    <div className="learn-more-container">
      <header className="page-header">
        <h1>Learn More About Our Logistics Management System</h1>
        <nav className="navbar">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="learn-more-body">
        <section className="content-section">
          <h2>Introduction</h2>
          <p>Welcome to the Learn More page. Our logistics management system is designed to optimize the movement and storage of goods, ensuring efficiency and cost-effectiveness.</p>
        </section>
        <section className="content-section">
          <h2>Our Services</h2>
          <p>We offer a range of services to meet your logistics needs:</p>
          <ul>
            <li>Import Management</li>
            <li>Export Management</li>
            <li>Warehouse Management</li>
            <li>Transport Management</li>
          </ul>
        </section>
        <section className="content-section">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to <a href="mailto:info@example.com">email us</a>.</p>
        </section>
      </main>
      <footer className="page-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LearnMorePage;
