import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePizza = () => {
  const [newPizza, setNewPizza] = useState({ name: '', description: '', price: '', image_url: '' });
  const navigate = useNavigate();

  const handleAddPizza = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/pizzas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPizza),
      });

      if (response.ok) {
        alert('Pizza created successfully');
        setNewPizza({ name: '', description: '', price: '', image_url: '' });
        navigate('/menu'); // Redirect back to Menu Management
      } else {
        console.error('Failed to create pizza');
      }
    } catch (error) {
      console.error('Error creating pizza:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Pizza</h1>
      <input
        type="text"
        placeholder="Pizza Name"
        value={newPizza.name}
        onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        value={newPizza.description}
        onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Price"
        value={newPizza.price}
        onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newPizza.image_url}
        onChange={(e) => setNewPizza({ ...newPizza, image_url: e.target.value })}
        style={styles.input}
      />
      <button onClick={handleAddPizza} style={styles.button}>
        Add Pizza
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

export default CreatePizza;