import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [toppingsOptions, setToppingsOptions] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customization, setCustomization] = useState({
    size: '',
    crust: 'Normal crust',
    toppings: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Fetch pizzas, sizes, and toppings from backend
  useEffect(() => {
    fetch('http://192.168.1.160/online-ordering-system/api/pizzas.php')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(() => Alert.alert('Error', 'Failed to fetch pizzas'));

    fetch('http://192.168.1.160/online-ordering-system/api/sizes.php')
      .then(res => res.json())
      .then(data => setSizes(data.map(s => s.size_type)))
      .catch(() => Alert.alert('Error', 'Failed to fetch sizes'));

    fetch('http://192.168.1.160/online-ordering-system/api/toppings.php')
      .then(res => res.json())
      .then(data => setToppingsOptions(data.map(t => t.name)))
      .catch(() => Alert.alert('Error', 'Failed to fetch toppings'));
  }, []);

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
    setSelectedItem(item);
    setCustomization({
      size: sizes[0] || '', // Default to the first size
      toppings: [], // Start with no toppings selected
    });
    setIsModalVisible(true);
  };

  const handleAddCustomizedItem = () => {
    setCart((prev) => [
      ...prev,
      { ...selectedItem, customization },
    ]);
    setCustomization({ size: sizes[0] || '', toppings: [] }); // Reset customization
    setSelectedItem(null);
    setIsModalVisible(false); // Close the modal
    Alert.alert('Added to Cart', `${selectedItem.name} has been customized and added to your cart.`);
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert('Please add at least one item to your cart.');
      return;
    }
    setIsPaymentModalVisible(true); // Show the payment popup
  };

  const handlePayment = async () => {
    // Validate payment details
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      Alert.alert('Error', 'Please fill in all payment details.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.160/online-ordering-system/api/orders.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          cart.map((item) => ({
            pizza_name: item.name,
            size: item.customization.size,
            toppings: item.customization.toppings, // Ensure this is an array of strings
            price: item.price,
            status: 'Preparing',
            user_id: 1, // Replace with the actual user ID
          }))
        ),
      });

      if (response.ok) {
        Alert.alert('Payment Successful', 'Your order has been placed!');
        setCart([]); // Clear the cart
        setIsPaymentModalVisible(false); // Close the payment modal
        navigation.navigate('Order'); // Navigate to the Order screen
      } else {
        const errorData = await response.json();
        console.error('Order creation failed:', errorData);
        Alert.alert('Error', 'Failed to create order.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.card}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price} PHP</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal visible={isPaymentModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={paymentDetails.cardNumber}
              onChangeText={(text) => setPaymentDetails((prev) => ({ ...prev, cardNumber: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              value={paymentDetails.expiryDate}
              onChangeText={(text) => setPaymentDetails((prev) => ({ ...prev, expiryDate: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={paymentDetails.cvv}
              onChangeText={(text) => setPaymentDetails((prev) => ({ ...prev, cvv: text }))}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handlePayment}>
                <Text style={styles.modalButtonText}>Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsPaymentModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Customization Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customize {selectedItem?.name}</Text>
            {/* Size Selection */}
            <Text style={styles.label}>Size</Text>
            <View style={styles.options}>
              {sizes.map((size) => (
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
            {/* Toppings Selection */}
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
            {/* Modal Buttons */}
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
                  setCustomization({ size: sizes[0] || '', toppings: [] });
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