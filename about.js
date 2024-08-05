import React, { useEffect } from 'react';
import './about.css'; // Import the CSS file for styling

function AboutPage() {
  useEffect(() => {
    document.body.classList.add('about-page-body');

    return () => {
      document.body.classList.remove('about-page-body');
    };
  }, []);

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <main className="about-main">
        <section className="about-section">
          <h2>Our History</h2>
          <p>
            Established in 2020, Swift Logistics has been at the forefront of providing innovative logistics solutions. Our journey began with a mission to simplify the complexities of logistics and supply chain management, and we have grown into a leading provider of integrated logistics services.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver exceptional logistics solutions that meet the evolving needs of our clients. We are committed to ensuring efficiency, reliability, and innovation in every aspect of our service, driving success for our clients and fostering a culture of continuous improvement.
          </p>
        </section>
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Team Member" />
              <h3>John Doe</h3>
              <p>CEO</p>
            </div>
            <div className="team-member">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegfqpGtTzym_EG644VzGiB5jJJWlmLKHw6Q&s" alt="Team Member" />
              <h3>Jane Smith</h3>
              <p>Chief Operations Officer</p>
            </div>
            <div className="team-member">
              <img src="https://media.istockphoto.com/id/1185367863/photo/smiling-business-woman-portrait.jpg?s=612x612&w=0&k=20&c=i19PDtTroZB0r1K1MmWARhdfQ4NHoTYB7SDyDn8W09I=" alt="Team Member" />
              <h3>Emily Johnson</h3>
              <p>Head of Logistics</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="about-footer">
        <p>© 2024 Swift Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
