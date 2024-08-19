import React, { useState, useEffect } from 'react';
import './AdminPortal.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [selectedUserShipments, setSelectedUserShipments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data from the JSON server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (err) {
        setError('Error fetching users');
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        if (selectedUser && selectedUser.id === id) {
          setSelectedUser(null);
          setSelectedUserShipments([]);
        }
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (err) {
      setError('Error deleting user');
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...editingUser,
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      const response = await fetch(`http://localhost:8080/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user)));
        setEditingUser(null);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (err) {
      setError('Error updating user');
      console.error('Error updating user:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewShipments = async (user) => {
    if (selectedUser && selectedUser.id === user.id) {
      // If the same user is clicked again, toggle shipments display
      setSelectedUser(null);
      setSelectedUserShipments([]);
    } else {
      try {
        const response = await fetch(`http://localhost:8080/shipments?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedUserShipments(data);
          setSelectedUser(user);
        } else {
          throw new Error('Failed to fetch shipments');
        }
      } catch (err) {
        setError('Error fetching shipments');
        console.error('Error fetching shipments:', err);
      }
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td
                onClick={() => handleViewShipments(user)}
                className="user-name-link"
              >
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-user">
          <h3>Edit User {editingUser.id}</h3>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          <label>Role:</label>
          <input name="role" value={formData.role} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {selectedUser && (
        <div className="user-shipments">
          <h3>Shipments for {selectedUser.name}</h3>
          {selectedUserShipments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedUserShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.trackingID}</td>
                    <td>{shipment.origin.city}, {shipment.origin.state}</td>
                    <td>{shipment.destination.city}, {shipment.destination.state}</td>
                    <td>{shipment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No shipments created by this user.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
