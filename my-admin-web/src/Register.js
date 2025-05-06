import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, email, password }),
      });
  
      if (response.ok) {
        alert('User Registered. Please check your email to verify.');
        navigate('/verify-email', { state: { email } }); // Pass email to the verification page
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create an Account</h1>
      <p style={styles.subtitle}>Sign up to get started</p>
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
      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>
      <p style={styles.footerText}>
        Already have an account?{' '}
        <span
          style={styles.link}
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
    </div>
  );
}

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

export default Register;