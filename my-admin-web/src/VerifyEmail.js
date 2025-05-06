import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [code, setCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verification_code: code }),
      });

      if (response.ok) {
        alert('Email verified successfully');
        navigate('/login'); // Redirect to login after successful verification
      } else {
        const data = await response.json();
        alert(`Verification failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during verification:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify Your Email</h1>
      <p style={styles.subtitle}>Enter the verification code sent to your email.</p>
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleVerify} style={styles.button}>
        Verify Email
      </button>
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
};

export default VerifyEmail;