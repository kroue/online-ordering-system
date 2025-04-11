import React, { useState } from 'react';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Pizza', price: 10 },
    { id: '2', name: 'Burger', price: 5 },
    { id: '3', name: 'Pasta', price: 8 },
    { id: '4', name: 'Salad', price: 6 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      alert('Please fill out all fields.');
      return;
    }
    setMenuItems([
      ...menuItems,
      { id: Date.now().toString(), name: newItem.name, price: parseFloat(newItem.price) },
    ]);
    setNewItem({ name: '', price: '' });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, price: item.price });
  };

  const handleUpdateItem = () => {
    if (!newItem.name || !newItem.price) {
      alert('Please fill out all fields.');
      return;
    }
    setMenuItems(
      menuItems.map((item) =>
        item.id === editingItem.id ? { ...item, name: newItem.name, price: parseFloat(newItem.price) } : item
      )
    );
    setEditingItem(null);
    setNewItem({ name: '', price: '' });
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menu Management</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          style={styles.input}
        />
        {editingItem ? (
          <button onClick={handleUpdateItem} style={styles.button}>
            Update Item
          </button>
        ) : (
          <button onClick={handleAddItem} style={styles.button}>
            Add Item
          </button>
        )}
      </div>
      <ul style={styles.list}>
        {menuItems.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <div>
              <button onClick={() => handleEditItem(item)} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff5e5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff69b4', // Pink
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    height: '40px',
    marginBottom: '10px',
    padding: '0 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#ff69b4', // Pink
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '400px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    backgroundColor: '#ff85c0', // Lighter pink
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff1493', // Darker pink
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default MenuManagement;