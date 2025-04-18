import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/login'); // Redirect to login
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
      <h2 style={styles.logo}>Powerpuff Shop</h2>
        <h2 style={styles.logo}>Admin Panel</h2>
        <nav style={styles.nav}>
          <Link to="/menu" style={styles.navLink}>Menu Management</Link>
          <Link to="/orders" style={styles.navLink}>Order Management</Link>
          <Link to="/users" style={styles.navLink}>User Management</Link>
        </nav>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#ff69b4', // Pink
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '10px',
    textAlign: 'center',
    backgroundColor: '#ff85c0', // Lighter pink
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  navLinkHover: {
    backgroundColor: '#ff1493', // Darker pink
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    color: '#ff69b4', // Pink
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffe4e1', // Light pink
  },
};

export default SidebarLayout;