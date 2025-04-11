import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'John Doe', status: 'Not Ready' },
    { id: 2, user: 'Jane Smith', status: 'Not Ready' },
  ]);

  const toggleOrderStatus = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: order.status === 'Ready' ? 'Not Ready' : 'Ready' }
        : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Management</h1>
      <ul style={styles.list}>
        {orders.map((order) => (
          <li key={order.id} style={styles.listItem}>
            <span>
              {order.user} - <strong>{order.status}</strong>
            </span>
            <button
              onClick={() => toggleOrderStatus(order.id)}
              style={styles.button}
            >
              {order.status === 'Ready' ? 'Mark as Not Ready' : 'Mark as Ready'}
            </button>
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
  button: {
    backgroundColor: '#ff69b4', // Pink
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default OrderManagement;