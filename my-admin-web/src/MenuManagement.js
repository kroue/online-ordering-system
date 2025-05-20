import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuManagement = () => {
  const [pizzas, setPizzas] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      fetchPizzas();
      fetchSizes();
      fetchToppings();
      fetchCrusts();
    }
  }, [navigate]);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/pizzas.php');
      if (response.ok) {
        const data = await response.json();
        setPizzas(Array.isArray(data) ? data : []);
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
        setSizes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  const fetchToppings = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/toppings.php');
      if (response.ok) {
        const data = await response.json();
        setToppings(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  const fetchCrusts = async () => {
    try {
      const response = await fetch('http://localhost/online-ordering-system/api/crusts.php');
      if (response.ok) {
        const data = await response.json();
        setCrusts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching crusts:', error);
    }
  };

  const handleEdit = (item, type) => {
    setEditItem({ ...item, type }); // Store the item and its type (e.g., 'pizzas', 'sizes', 'toppings', 'crusts')
    setEditPopupVisible(true); // Show the edit popup
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost/online-ordering-system/api/${editItem.type}.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem),
      });

      if (response.ok) {
        alert('Item updated successfully');
        setEditPopupVisible(false); // Close the popup
        // Refresh the data
        if (editItem.type === 'pizzas') fetchPizzas();
        if (editItem.type === 'sizes') fetchSizes();
        if (editItem.type === 'toppings') fetchToppings();
        if (editItem.type === 'crusts') fetchCrusts();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost/online-ordering-system/api/${type}.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('Item deleted successfully');
        // Refresh the data after deletion
        if (type === 'pizzas') fetchPizzas();
        if (type === 'sizes') fetchSizes();
        if (type === 'toppings') fetchToppings();
        if (type === 'crusts') fetchCrusts();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={styles.container}>
      {user && <h2 style={styles.welcomeMessage}>Welcome, {user.username}!</h2>}
      <h1 style={styles.title}>Menu Management</h1>

      {/* Edit Popup */}
      {editPopupVisible && (
        <div style={styles.popup}>
          {editItem?.type === 'pizzas' && (
            <>
              <h3>Edit Pizza</h3>
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    value={editItem.name || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, name: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    value={editItem.description || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, description: e.target.value }))
                    }
                    style={styles.textarea}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    value={editItem.price || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, price: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <label>
                  Image Link:
                  <input
                    type="text"
                    value={editItem.image_url || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, image_url: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <div style={styles.buttonContainer}>
                  <button type="button" onClick={handleSaveEdit} style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPopupVisible(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
          {editItem?.type === 'sizes' && (
            <>
              <h3>Edit Size</h3>
              <form>
                <label>
                  Size:
                  <input
                    type="text"
                    value={editItem.size_type || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, size_type: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <div style={styles.buttonContainer}>
                  <button type="button" onClick={handleSaveEdit} style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPopupVisible(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
          {editItem?.type === 'toppings' && (
            <>
              <h3>Edit Topping</h3>
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    value={editItem.name || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, name: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <div style={styles.buttonContainer}>
                  <button type="button" onClick={handleSaveEdit} style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPopupVisible(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
          {editItem?.type === 'crusts' && (
            <>
              <h3>Edit Crust</h3>
              <form>
                <label>
                  Type:
                  <input
                    type="text"
                    value={editItem.type || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, type: e.target.value }))
                    }
                    style={styles.input}
                  />
                </label>
                <div style={styles.buttonContainer}>
                  <button type="button" onClick={handleSaveEdit} style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPopupVisible(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Create Buttons */}
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/create-pizza')} style={styles.button}>Create Pizza</button>
        <button onClick={() => navigate('/create-size')} style={styles.button}>Create Size</button>
        <button onClick={() => navigate('/create-topping')} style={styles.button}>Create Topping</button>
        <button onClick={() => navigate('/create-crust-type')} style={styles.button}>Create Crust Type</button>
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
              <div>
                <button onClick={() => handleEdit(pizza, 'pizzas')} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(pizza.id, 'pizzas')} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sizes List */}
      <div style={styles.section}>
        <h3 style={styles.subSectionTitle}>Sizes</h3>
        <ul style={styles.list}>
          {sizes.map((size) => (
            <li key={size.id} style={styles.listItem}>
              {size.size_type}
              <div>
                <button onClick={() => handleEdit(size, 'sizes')} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(size.id, 'sizes')} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Toppings List */}
      <div style={styles.section}>
        <h3 style={styles.subSectionTitle}>Toppings</h3>
        <ul style={styles.list}>
          {toppings.map((topping) => (
            <li key={topping.id} style={styles.listItem}>
              {topping.name}
              <div>
                <button onClick={() => handleEdit(topping, 'toppings')} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(topping.id, 'toppings')} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Crusts List */}
      <div style={styles.section}>
        <h3 style={styles.subSectionTitle}>Crust Types</h3>
        <ul style={styles.list}>
          {crusts.map((crust) => (
            <li key={crust.id} style={styles.listItem}>
              {crust.type}
              <div>
                <button onClick={() => handleEdit(crust, 'crusts')} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(crust.id, 'crusts')} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
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
    backgroundColor: '#ffffff', // White
    minHeight: '100vh',
  },
  welcomeMessage: {
    fontSize: '18px',
    color: '#ff69b4',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000', // Black
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#000000', // Black
    color: '#ffffff', // White
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
    backgroundColor: '#ffffff', // White
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '400px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Red for delete
    color: '#ffffff', // White
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginLeft: '10px',
  },
};

export default MenuManagement;