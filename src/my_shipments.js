import React, { useState, useEffect } from 'react';
import './my_shipments.css';
import { Link } from 'react-router-dom';

const MyShipments = () => {
    const [trackingID, setTrackingID] = useState('');
    const [shipment, setShipment] = useState(null);
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all shipments to display statistics
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
            } else {
                throw new Error('Shipment not found');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const totalShipments = shipments.length;
    const totalWeight = shipments.reduce((acc, shipment) => acc + (shipment.pallet.weight || 0), 0);
    const totalPaid = shipments.reduce((acc, shipment) => acc + (shipment.pallet.declaredValue || 0), 0);

    // Ensure totalPaid is a number
    const formattedTotalPaid = Number(totalPaid).toFixed(2);

    return (
        <div className="my-shipments-container">
            <aside className="my-sidebar">
                <button className="my-create-shipment-button">
                    + Create Shipment
                </button>
                <nav className="my-sidebar-nav">
                    <Link to="/" className="my-nav-item">Home</Link>
                    <Link to="/user_dashboard" className="my-nav-item">Dashboard</Link>
                    <Link to="/create_shipment" className="my-nav-item">Create Shipment</Link>
                    <Link to="/my_shipments" className="my-nav-item active">My Shipments</Link>
                    <Link to="/pick-up" className="my-nav-item">Pick-up</Link>
                    <Link to="/billing" className="my-nav-item">Billing & Payments</Link>
                    <Link to="/ecommerce-pro" className="my-nav-item">Ecommerce Pro</Link>
                    <Link to="/buyers-experience" className="my-nav-item">Buyer’s Experience</Link>
                    <Link to="/services" className="my-nav-item">Services</Link>
                </nav>
                <div className="my-sidebar-footer">
                    <Link to="/help" className="my-nav-item">Help</Link>
                    <Link to="/settings" className="my-nav-item">Settings</Link>
                    <Link to="/developers" className="my-nav-item">Developers</Link>
                    <button className="my-logout-button">Log Out</button>
                </div>
            </aside>
            <main className="my-shipments-main">
                <header className="my-shipments-header">
                    <h2>My Shipments</h2>
                    <div className="my-search-container">
                        <input
                            type="text"
                            placeholder="Enter Tracking ID"
                            value={trackingID}
                            onChange={(e) => setTrackingID(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </header>
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
                <section className="my-statistics-section">
                    <h3>Statistics</h3>
                    <div className="my-statistics-card">
                        <h4>Total Shipments</h4>
                        <p>{totalShipments}</p>
                    </div>
                    <div className="my-statistics-card">
                        <h4>Total Weight</h4>
                        <p>{totalWeight} KG</p>
                    </div>
                    <div className="my-statistics-card">
                        <h4>Total Paid</h4>
                        <p>₹{formattedTotalPaid} INR</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MyShipments;
