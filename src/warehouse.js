import React, { useState, useEffect } from 'react';
import './warehouse.css';

function InventoryPage() {
  // Initialize inventory state with data from local storage or an empty array
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    quantity: '',
    location: '',
    lastUpdated: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Update local storage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to add a new item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.quantity && formData.location && formData.lastUpdated) {
      const newItem = { ...formData, id: Date.now() };
      setInventory([...inventory, newItem]);
      setFormData({
        id: '',
        name: '',
        quantity: '',
        location: '',
        lastUpdated: '',
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle item deletion
  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <h1>Warehouse Inventory Management</h1>
      </header>
      <main className="inventory-main-content">
        <section className="inventory-intro">
          <h2>Inventory Overview</h2>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <div className="inventory-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.location}</td>
                      <td>{item.lastUpdated}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="inventory-form">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastUpdated">Last Updated:</label>
            <input
              type="date"
              id="lastUpdated"
              name="lastUpdated"
              value={formData.lastUpdated}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Item</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default InventoryPage;
