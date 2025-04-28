import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation }) => {
  const [menuItems] = useState([
    {
      id: '1',
      name: 'Margherita',
      description: 'Classic cheese and tomato pizza.',
      price: 10,
      image: require('../assets/margherita.jpg'),
      customizable: true,
    },
    {
      id: '2',
      name: 'Pepperoni',
      description: 'Topped with pepperoni slices.',
      price: 12,
      image: require('../assets/pepperoni.jpg'),
      customizable: true,
    },
    {
      id: '3',
      name: 'BBQ Chicken',
      description: 'BBQ sauce base with chicken toppings.',
      price: 15,
      image: require('../assets/bbq_chicken.jpg'),
      customizable: false,
    },
    {
      id: '4',
      name: 'Hawaiian',
      description: 'Pineapple and ham on a cheese base.',
      price: 14,
      image: require('../assets/hawaiian.jpg'),
      customizable: false,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customization, setCustomization] = useState({
    size: 'Medium',
    crust: 'Normal crust',
    toppings: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toppingsOptions = ['Extra Cheese', 'Mushrooms', 'Pepperoni', 'Olives', 'Onions'];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const addToCart = (item) => {
    if (item.customizable) {
      setSelectedItem(item);
      setIsModalVisible(true); // Open customization modal
    } else {
      setCart((prev) => [...prev, { ...item, customization: null }]);
      Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
    }
  };

  const handleAddCustomizedItem = () => {
    setCart((prev) => [
      ...prev,
      { ...selectedItem, customization },
    ]);
    setCustomization({ size: 'Medium', crust: 'Normal crust', toppings: [] });
    setSelectedItem(null);
    setIsModalVisible(false);
    Alert.alert('Added to Cart', `${selectedItem.name} has been customized and added to your cart.`);
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('Please add at least one item to your cart.');
      return;
    }
    navigation.navigate('Order', { cart, setCart });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Clear user data
      navigation.navigate('Login'); // Navigate back to the Login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Favorite Food</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
      />
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Proceed to Order</Text>
      </TouchableOpacity>

      {/* Customization Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customize {selectedItem?.name}</Text>
            <Text style={styles.label}>Size</Text>
            <View style={styles.options}>
              {['Small', 'Medium', 'Large'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.optionButton,
                    customization.size === size && styles.selectedOption,
                  ]}
                  onPress={() => setCustomization((prev) => ({ ...prev, size }))}
                >
                  <Text style={styles.optionText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Crust</Text>
            <View style={styles.options}>
              {['Normal crust', 'Thin crust', 'Stuffed crust'].map((crust) => (
                <TouchableOpacity
                  key={crust}
                  style={[
                    styles.optionButton,
                    customization.crust === crust && styles.selectedOption,
                  ]}
                  onPress={() => setCustomization((prev) => ({ ...prev, crust }))}
                >
                  <Text style={styles.optionText}>{crust}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Toppings</Text>
            <View style={styles.options}>
              {toppingsOptions.map((topping) => (
                <TouchableOpacity
                  key={topping}
                  style={[
                    styles.optionButton,
                    customization.toppings.includes(topping) && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setCustomization((prev) => ({
                      ...prev,
                      toppings: prev.toppings.includes(topping)
                        ? prev.toppings.filter((t) => t !== topping)
                        : [...prev.toppings, topping],
                    }))
                  }
                >
                  <Text style={styles.optionText}>{topping}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddCustomizedItem}
              >
                <Text style={styles.modalButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setCustomization({ size: 'Medium', crust: 'Normal crust', toppings: [] });
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5e5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#ffa07a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff7f50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutText: {
    color: '#ff7f50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#ff7f50',
    borderColor: '#ff7f50',
  },
  optionText: {
    color: '#555',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#ff7f50',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;