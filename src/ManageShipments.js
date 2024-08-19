import React, { useState, useEffect } from 'react';
import './ManageShipment.css';

function ManageShipments() {
  const [shipments, setShipments] = useState([]);
  const [editingShipment, setEditingShipment] = useState(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    content: '',
    weight: '',
    status: '',
  });

  useEffect(() => {
    // Fetch shipments data from the JSON server
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:8080/shipments');
        const data = await response.json();
        setShipments(data);
      } catch (err) {
        console.error('Error fetching shipments:', err);
      }
    };
    fetchShipments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/shipments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setShipments(shipments.filter((shipment) => shipment.id !== id));
      } else {
        console.error('Failed to delete shipment');
      }
    } catch (err) {
      console.error('Error deleting shipment:', err);
    }
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setFormData({
      origin: shipment.origin.address1,
      destination: shipment.destination.address1,
      content: shipment.pallet.content,
      weight: shipment.pallet.weight,
      status: shipment.status,
    });
  };

  const handleSave = async () => {
    try {
      const updatedShipment = {
        ...editingShipment,
        origin: { ...editingShipment.origin, address1: formData.origin },
        destination: { ...editingShipment.destination, address1: formData.destination },
        pallet: {
          ...editingShipment.pallet,
          content: formData.content,
          weight: formData.weight,
        },
        status: formData.status,
      };

      const response = await fetch(`http://localhost:8080/shipments/${editingShipment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedShipment),
      });

      if (response.ok) {
        setShipments(shipments.map((shipment) =>
          shipment.id === editingShipment.id ? updatedShipment : shipment
        ));
        setEditingShipment(null);
      } else {
        console.error('Failed to update shipment');
      }
    } catch (err) {
      console.error('Error updating shipment:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="manage-shipments">
      <h2>Manage Shipments</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tracking ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Content</th>
            <th>Weight (KG)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.trackingID}</td>
              <td>{shipment.origin.city}, {shipment.origin.state}</td>
              <td>{shipment.destination.city}, {shipment.destination.state}</td>
              <td>{shipment.pallet.content}</td>
              <td>{shipment.pallet.weight}</td>
              <td>{shipment.status || 'Pending'}</td>
              <td>
                <button onClick={() => handleEdit(shipment)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(shipment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingShipment && (
        <div className="edit-shipment">
          <h3>Edit Shipment {editingShipment.id}</h3>
          <label>Origin Address:</label>
          <input
            name="origin"
            value={formData.origin}
            onChange={handleChange}
          />
          <label>Destination Address:</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
          <label>Content:</label>
          <input
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
          <label>Weight (KG):</label>
          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
          <label>Status:</label>
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingShipment(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageShipments;
