import React, { useState, useEffect } from 'react';
import './user_dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import MyBarChart from './my_barChart';

const UserDashboard = ({ username }) => {
    const navigate = useNavigate();
    const [shipmentStats, setShipmentStats] = useState({
        totalShipments: 0,
        avgWeight: 0,
        totalPaid: 0,
        refunds: 0,
        shipmentStatus: 'In Transit',
    });

    useEffect(() => {
        fetch('http://localhost:5000/shipmentsData')
            .then(response => response.json())
            .then(data => {
                const totalShipments = data.length;
                const totalWeight = data.reduce((sum, shipment) => sum + shipment.weight, 0);
                const totalPaid = data.reduce((sum, shipment) => sum + shipment.payment, 0);
                const refunds = data.reduce((sum, shipment) => sum + shipment.refunds, 0);
                const avgWeight = totalShipments > 0 ? totalWeight / totalShipments : 0;

                setShipmentStats({
                    totalShipments,
                    avgWeight,
                    totalPaid,
                    refunds,
                    shipmentStatus: 'In Transit',
                });
            })
            .catch(error => console.error('Error fetching shipment data:', error));
    }, []);

    const chartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example labels
        values: [10, 20, 15, 30] // Example data
    };

    const handleCreateShipment = () => {
        navigate('/create_shipment');
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <button className="create-shipment-button" onClick={handleCreateShipment}>
                    + Create Shipment
                </button>
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/user_dashboard" className="nav-item active">Dashboard</Link>
                    <Link to="/create_shipment" className="nav-item">Create Shipment</Link>
                    <Link to="/my_shipments" className="nav-item">My Shipments</Link>
                    <Link to="/my_shipments" className="nav-item">Pick-up</Link>
                    <Link to="/billing" className="nav-item">Billing & Payments</Link>
                    <Link to="/ecommerce-pro" className="nav-item">Ecommerce Pro</Link>
                    <Link to="/buyers-experience" className="nav-item">Buyer’s Experience</Link>
                    <Link to="/services" className="nav-item">Services</Link>
                </nav>
                <div className="sidebar-footer">
                    <Link to="/help" className="nav-item">Help</Link>
                    <Link to="/settings" className="nav-item">Settings</Link>
                    <Link to="/developers" className="nav-item">Developers</Link>
                    <button className="logout-button">Log Out</button>
                </div>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2 className="dashboard-title">Hello, {username}</h2>
                </header>
                <section className="dashboard-content">
                    <div className="statistics-section">
                        <div className="statistics-card">
                            <h3>Shipments created this month</h3>
                            <MyBarChart data={chartData} />
                        </div>
                        <div className="statistics-card">
                            <h3>Top carriers</h3>
                            <p>No carriers</p>
                        </div>
                        <div className="statistics-card">
                            <h3>Shipment Status</h3>
                            <p>{shipmentStats.shipmentStatus}</p>
                        </div>
                    </div>
                    <div className="statistics-section">
                        <div className="statistics-card">
                            <h3>Total shipments</h3>
                            <p>{shipmentStats.totalShipments}</p>
                        </div>
                        <div className="statistics-card">
                            <h3>Average weight</h3>
                            <p>{shipmentStats.avgWeight.toFixed(2)} KG</p>
                        </div>
                        <div className="statistics-card">
                            <h3>Total paid</h3>
                            <p>₹{shipmentStats.totalPaid.toFixed(2)} INR</p>
                        </div>
                        <div className="statistics-card">
                            <h3>Refunds</h3>
                            <p>₹{shipmentStats.refunds.toFixed(2)} INR</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
