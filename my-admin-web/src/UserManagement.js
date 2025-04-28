import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { username: 'John Doe', email: 'john@example.com' },
    { username: 'Jane Smith', email: 'jane@example.com' },
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management</h1>
      <ul style={styles.list}>
        {users.map((user, index) => (
          <li key={index} style={styles.listItem}>
            <span>
              {user.username} - <strong>{user.email}</strong>
            </span>
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
    padding: '10px 15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default UserManagement;