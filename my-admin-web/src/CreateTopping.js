import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTopping = () => {
  const [newTopping, setNewTopping] = useState('');
  const navigate = useNavigate();

  const handleAddTopping = async () => {
    console.log('Adding topping:', newTopping); // Debugging line
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/toppings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTopping }),
      });
  
      console.log('Response status:', response.status); // Debugging line
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debugging line
        alert('Topping created successfully');
        setNewTopping('');
        navigate('/menu'); // Redirect back to Menu Management
      } else {
        const errorData = await response.json();
        console.error('Failed to create topping:', errorData);
        alert(`Error: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating topping:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Topping</h1>
      <input
        type="text"
        placeholder="Topping Name"
        value={newTopping}
        onChange={(e) => setNewTopping(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddTopping} style={styles.button}>
        Add Topping
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

export default CreateTopping;