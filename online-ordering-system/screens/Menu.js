import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation }) => {
  const [menuItems] = useState([
    { id: '1', name: 'Pizza', price: 10, customizable: true },
    { id: '2', name: 'Burger', price: 5, customizable: true },
    { id: '3', name: 'Pasta', price: 8, customizable: false },
    { id: '4', name: 'Salad', price: 6, customizable: false },
  ]);

  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customization, setCustomization] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    if (!customization.trim()) {
      Alert.alert('Error', 'Please provide customization details.');
      return;
    }
    setCart((prev) => [
      ...prev,
      { ...selectedItem, customization },
    ]);
    setCustomization('');
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
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
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
            <Text style={styles.label}>Customization</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter customization details (e.g., extra cheese, no onions)"
              value={customization}
              onChangeText={(text) => setCustomization(text)}
              multiline
            />
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
                  setCustomization('');
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
    backgroundColor: '#ffe4e1', // Light pink background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff69b4', // Hot pink
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#ff1493', // Deep pink
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff69b4', // Hot pink
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
    color: '#ff69b4', // Hot pink
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
    color: '#ff69b4', // Hot pink
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#ff69b4', // Hot pink
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