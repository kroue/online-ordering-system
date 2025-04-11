import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/menu'); // Navigate to the Menu page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome Back!</h1>
      <p style={styles.subtitle}>Login to continue</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      <p style={styles.footerText}>
        Don't have an account?{' '}
        <span
          style={styles.link}
          onClick={() => navigate('/register')}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff5e5',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    height: '50px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '0 15px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    maxWidth: '400px',
    height: '50px',
    backgroundColor: '#ff7f50',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  footerText: {
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#ff7f50',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Login;