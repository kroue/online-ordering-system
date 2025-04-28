import React, { useState } from 'react';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Margherita',
      description: 'Classic cheese and tomato pizza.',
      price: 10,
      image: require('./margherita.jpg') // Example of local image
    },
    {
      id: '2',
      name: 'Pepperoni',
      description: 'Topped with pepperoni slices.',
      price: 12,
      image: require('./pepperoni.jpg'), // Example of local image
    },
    {
      id: '3',
      name: 'Italian',
      description: 'Italian sausage and peppers.',
      price: 10,
      image: require('./italian.jpg') // Example of local image
    },
  ]);

  const [pizzaSizes, setPizzaSizes] = useState(['Small', 'Medium', 'Large']);
  const [crustTypes, setCrustTypes] = useState(['Normal crust', 'Thin crust', 'Stuffed crust']);
  const [toppings, setToppings] = useState(['Extra Cheese', 'Mushrooms', 'Pepperoni', 'Olives', 'Onions']);

  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image: '' });
  const [newSize, setNewSize] = useState('');
  const [newCrust, setNewCrust] = useState('');
  const [newTopping, setNewTopping] = useState('');

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      alert('Please fill out all fields.');
      return;
    }
    setMenuItems([
      ...menuItems,
      {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        image: newItem.image,
      },
    ]);
    setNewItem({ name: '', description: '', price: '', image: '' });
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleAddSize = () => {
    if (newSize.trim() === '') return alert('Please enter a size.');
    setPizzaSizes([...pizzaSizes, newSize]);
    setNewSize('');
  };

  const handleAddCrust = () => {
    if (newCrust.trim() === '') return alert('Please enter a crust type.');
    setCrustTypes([...crustTypes, newCrust]);
    setNewCrust('');
  };

  const handleAddTopping = () => {
    if (newTopping.trim() === '') return alert('Please enter a topping.');
    setToppings([...toppings, newTopping]);
    setNewTopping('');
  };

  const handleDeleteSize = (size) => {
    setPizzaSizes(pizzaSizes.filter((s) => s !== size));
  };

  const handleDeleteCrust = (crust) => {
    setCrustTypes(crustTypes.filter((c) => c !== crust));
  };

  const handleDeleteTopping = (topping) => {
    setToppings(toppings.filter((t) => t !== topping));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menu Management</h1>
      <div style={styles.columns}>
        {/* Left Column: Pizza Management */}
        <div style={styles.column}>
          <h2 style={styles.sectionTitle}>Add New Pizza</h2>
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Pizza Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              style={styles.textarea}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              style={styles.input}
            />
            <button onClick={handleAddItem} style={styles.button}>
              Add Pizza
            </button>
          </div>
          <ul style={styles.list}>
            {menuItems.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <img src={item.image} alt={item.name} style={styles.image} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Pizza Customization Management */}
        <div style={styles.column}>
          <h2 style={styles.sectionTitle}>Pizza Customization</h2>

          {/* Pizza Sizes Section */}
          <div style={styles.section}>
            <h3 style={styles.subSectionTitle}>Pizza Sizes</h3>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Add a new size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddSize} style={styles.button}>
                Add Size
              </button>
            </div>
            <ul style={styles.list}>
              {pizzaSizes.map((size, index) => (
                <li key={index} style={styles.listItem}>
                  {size}
                  <button onClick={() => handleDeleteSize(size)} style={styles.deleteButton}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Crust Types Section */}
          <div style={styles.section}>
            <h3 style={styles.subSectionTitle}>Crust Types</h3>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Add a new crust type"
                value={newCrust}
                onChange={(e) => setNewCrust(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddCrust} style={styles.button}>
                Add Crust
              </button>
            </div>
            <ul style={styles.list}>
              {crustTypes.map((crust, index) => (
                <li key={index} style={styles.listItem}>
                  {crust}
                  <button onClick={() => handleDeleteCrust(crust)} style={styles.deleteButton}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Toppings Section */}
          <div style={styles.section}>
            <h3 style={styles.subSectionTitle}>Toppings</h3>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Add a new topping"
                value={newTopping}
                onChange={(e) => setNewTopping(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddTopping} style={styles.button}>
                Add Topping
              </button>
            </div>
            <ul style={styles.list}>
              {toppings.map((topping, index) => (
                <li key={index} style={styles.listItem}>
                  {topping}
                  <button onClick={() => handleDeleteTopping(topping)} style={styles.deleteButton}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
    color: '#ff7f50',
    marginBottom: '20px',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
  },
  column: {
    flex: 1,
    margin: '0 10px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // Changed to column for better alignment
    marginBottom: '10px',
  },
  input: {
    width: '80%',
    height: '40px',
    marginBottom: '10px',
    padding: '0 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '80%',
    height: '80px',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    resize: 'none',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#ff7f50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
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
    borderRadius: '10px',
    marginRight: '15px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default MenuManagement;