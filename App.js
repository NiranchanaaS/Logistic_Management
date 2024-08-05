import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; // Import the Home component
import LoginForm from './LoginForm'; // Import the LoginForm component
import RegisterForm from './RegisterForm';
import LearnMorePage from './LearnMorePage';
import ShipmentDetails from './shipment';
import TrackShipment from './track';
import ImportPage from './imp';
import ExportPage from './export';
import InventoryPage from './warehouse';
import TransportPage from './transport';
import ContactPage from './contact'; // Import ContactPage component
import AboutPage from './about';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import AdminPortal from './AdminPortal';
import Dashboard from './Dashboard';
import ManageShipments from './ManageShipments';
import ManageUsers from './ManageUsers';
import Reports from './Reports';
// import './AdminPortal.css';


function App() {
  useEffect(() => {
    document.body.classList.add('home-body'); // Add class to body for Home page

    // Clean up the class when component unmounts or changes
    return () => {
      document.body.classList.remove('home-body');
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/shipment" element={<ShipmentDetails />} />
        <Route path="/track" element={<TrackShipment />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/warehouse" element={<InventoryPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/" element={<Dashboard />} />
          <Route path="/manage-shipments" element={<ManageShipments />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/reports" element={<Reports />} />

        {/* <Route path="/manage-shipments" element={<ManageShipments />} /> */}
        {/* <Route path="/admin-portal" element={<AdminPortal />} /> */}
        {/* Uncomment and use the route if you have a `Contact` component */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
