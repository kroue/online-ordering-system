import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const Order = ({ route, navigation }) => {
  const { cart, setCart } = route.params; // Receive cart and setCart from the parent

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    const orders = cart.map((item) => ({
      ...item,
      status: 'Preparing', // Default status for all items
    }));

    Alert.alert('Order Successful', 'Your order has been placed!', [
      {
        text: 'OK',
        onPress: () => {
          setCart([]); // Clear the cart
          navigation.navigate('Tracking', { orders }); // Navigate to Tracking page with orders
        },
      },
    ]);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {item.customization && (
          <View style={styles.customizationContainer}>
            <Text style={styles.customization}>
              Size: {item.customization.size}
            </Text>
            <Text style={styles.customization}>
              Crust: {item.customization.crust}
            </Text>
            <Text style={styles.customization}>
              Toppings: {item.customization.toppings.join(', ')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cartList}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff69b4', // Hot pink title
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff', // Keep white for contrast
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  customizationContainer: {
    marginTop: 5,
  },
  customization: {
    fontSize: 14,
    color: '#777',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#ff1493', // Deep pink for total
  },
  checkoutButton: {
    backgroundColor: '#ff69b4', // Hot pink button
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Order;