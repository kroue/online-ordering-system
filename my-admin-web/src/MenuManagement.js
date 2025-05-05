import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuManagement = () => {
  const [pizzas, setPizzas] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const navigate = useNavigate();

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/pizzas.php');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Pizzas:', data);
        setPizzas(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch pizzas');
      }
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/sizes.php');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Sizes:', data); // Debugging line
        setSizes(Array.isArray(data) ? data : []); // Ensure data is an array
      } else {
        console.error('Failed to fetch sizes');
      }
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };
  
  const fetchToppings = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/toppings.php');
      console.log('Toppings API Response:', response); // Debugging line
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Toppings:', data); // Debugging line
        setToppings(Array.isArray(data) ? data : []); // Ensure data is an array
      } else {
        console.error('Failed to fetch toppings');
      }
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
    fetchSizes();
    fetchToppings();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menu Management</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/create-pizza')} style={styles.button}>
          Create Pizza
        </button>
        <button onClick={() => navigate('/create-size')} style={styles.button}>
          Create Size
        </button>
        <button onClick={() => navigate('/create-topping')} style={styles.button}>
          Create Topping
        </button>
      </div>

      {/* Pizza List */}
      <div style={styles.section}>
        <h3 style={styles.subSectionTitle}>Pizzas</h3>
        <ul style={styles.list}>
          {pizzas.map((pizza) => (
            <li key={pizza.id} style={styles.listItem}>
              <div>
                <strong>{pizza.name}</strong> - {pizza.price} PHP
                <p>{pizza.description}</p>
              </div>
              <img
                src={pizza.image_url}
                alt={pizza.name}
                style={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>

{/* Sizes List */}
<div style={styles.section}>
  <h3 style={styles.subSectionTitle}>Sizes</h3>
  {sizes.length > 0 ? (
    <ul style={styles.list}>
      {sizes.map((size) => (
        <li key={size.id} style={styles.listItem}>
          {size.size_type}
        </li>
      ))}
    </ul>
  ) : (
    <p>No sizes available</p> // Graceful fallback
  )}
</div>

{/* Toppings List */}
<div style={styles.section}>
  <h3 style={styles.subSectionTitle}>Toppings</h3>
  {toppings.length > 0 ? (
    <ul style={styles.list}>
      {toppings.map((topping) => (
        <li key={topping.id} style={styles.listItem}>
          {topping.name}
        </li>
      ))}
    </ul>
  ) : (
    <p>No toppings available</p> // Graceful fallback
  )}
</div>
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
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  section: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  subSectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
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
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginLeft: '10px',
  },
};

export default MenuManagement;