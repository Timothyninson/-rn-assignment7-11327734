import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

// Import your images here
import Logo from './assets/Logo.png'; 
import Search from './assets/Search.png'; 
import Remove from './assets/remove.png'; 
import ShoppingBag from './assets/shoppingBag.png'; 

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0); 
  const [inMemoryCart, setInMemoryCart] = useState([]); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
        setInMemoryCart(cart ? JSON.parse(cart) : []); 
        calculateTotal(); // Calculate the total initially
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = (productId) => {
    const updatedInMemoryCart = inMemoryCart.filter(item => item.id !== productId);
    setInMemoryCart(updatedInMemoryCart);
    updateAsyncStorage(updatedInMemoryCart);
    calculateTotal(); // Update total after removing item
  };

  const calculateTotal = () => {
    const totalAmount = inMemoryCart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(totalAmount);
  };

  const updateAsyncStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const [lineLength, setLineLength] = useState(100);
  return (
    <SafeAreaView style ={styles.container}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}> 
          <Image source={Logo} style={styles.logo} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={Search} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.checkoutTitle}>CHECKOUT</Text>

      <View style={styles.lineContainer}>
        <View style={[styles.line, { width: lineLength }]} />
        <View style={styles.diamond} />
        <View style={[styles.line, { width: lineLength }]} />
      </View>

      {cartItems.length > 0 ? ( // Conditional rendering
        <FlatList
          data={inMemoryCart} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              <Image source={item.image} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name.toUpperCase()}</Text>
                <Text style={styles.cartItemDescription}>{item.description}</Text>
                <Text style={[styles.cartItemPrice,  { color: 'orange' }]}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                <Image source={Remove} style={styles.removeFromCartIcon} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text> // Message if cart is empty
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={[styles.totalValue, { color: 'orange' }]}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.checkoutButtonContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Checkout')}>
          <View style={styles.checkoutButton}>
            <Image source={ShoppingBag} style={styles.cartIcon} />
            <Text style={styles.checkoutText}>CHECKOUT</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoContainer: {
    flex: 1, 
    alignItems: 'center',
    marginBottom:15, 
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  icon: {
    width: 24,
    height: 24,
  },
  checkoutTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:90,
    
  },
  line: {
   
    height: 1,
    backgroundColor: 'black',
    width:1,
   
  },
  diamond: {
    width: 10,
    height: 10,
    backgroundColor: 'white', 
    borderColor: 'black', 
    borderWidth: 1, 
    transform: [{ rotate: '45deg' }], 
   
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  cartItemImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemDescription: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
  },
  removeFromCartIcon: {
    width: 24,
    height: 24,
  },
  checkoutButtonContainer: {
    width: '100%',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 20,
  
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    width: '100%',
  },
  checkoutText: {
    color: 'white',
    marginLeft: 10,
  },
  cartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;