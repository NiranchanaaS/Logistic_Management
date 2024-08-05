import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar'; // This will be your horizontal navbar
import Dashboard from './Dashboard';
import ManageShipments from './ManageShipments';
import ManageUsers from './ManageUsers';
import Reports from './Reports';
import './AdminPortal.css';

function AdminPortal() {
  return (
    <div className="admin-portal">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-shipments" element={<ManageShipments />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPortal;
