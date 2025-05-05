import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSize = () => {
  const [newSize, setNewSize] = useState('');
  const navigate = useNavigate();

  const handleAddSize = async () => {
    console.log('Adding size:', newSize); // Debugging line
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/sizes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ size_type: newSize }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debugging line
        alert('Size created successfully');
        setNewSize('');
        navigate('/menu'); // Redirect back to Menu Management
      } else {
        console.error('Failed to create size');
      }
    } catch (error) {
      console.error('Error creating size:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Size</h1>
      <input
        type="text"
        placeholder="Size Type"
        value={newSize}
        onChange={(e) => setNewSize(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddSize} style={styles.button}>
        Add Size
      </button>
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
    color: '#ff69b4',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    height: '40px',
    marginBottom: '20px',
    padding: '0 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default CreateSize;