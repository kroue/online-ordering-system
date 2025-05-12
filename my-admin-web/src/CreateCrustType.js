import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCrustType = () => {
  const [newCrustType, setNewCrustType] = useState('');
  const navigate = useNavigate();

  const handleAddCrustType = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/crusts.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: newCrustType }),
      });

      if (response.ok) {
        alert('Crust type created successfully');
        setNewCrustType('');
        navigate('/menu'); // Redirect back to Menu Management
      } else {
        const errorData = await response.json();
        console.error('Failed to create crust type:', errorData);
        alert(`Error: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating crust type:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Crust Type</h1>
      <input
        type="text"
        placeholder="Crust Type Name"
        value={newCrustType}
        onChange={(e) => setNewCrustType(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddCrustType} style={styles.button}>
        Add Crust Type
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

export default CreateCrustType;