import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; 

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); 
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0); 
  const [inMemoryCart, setInMemoryCart] = useState([]); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
        setInMemoryCart(cart ? JSON.parse(cart) : []); 
        calculateTotal(); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  // Handle adding a product to the cart
  useEffect(() => {
    if (route.params?.product) {
      const product = route.params.product;
      // Assuming you want to add the product with a quantity of 1
      addProductToCart(product, 1); 
      navigation.setParams({ product: null }); // Clear the product from params
    }
  }, [route.params]);

  const addProductToCart = (product, quantity) => {
    const existingItem = inMemoryCart.find(item => item.id === product.id);
    if (existingItem) {
      // If item exists, update its quantity
      const updatedInMemoryCart = inMemoryCart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setInMemoryCart(updatedInMemoryCart);
      updateAsyncStorage(updatedInMemoryCart);
    } else {
      // If item doesn't exist, add it to the cart
      const updatedInMemoryCart = [...inMemoryCart, { ...product, quantity }];
      setInMemoryCart(updatedInMemoryCart);
      updateAsyncStorage(updatedInMemoryCart);
    }
    calculateTotal();
  };

  const removeFromCart = (productId) => {
    const updatedInMemoryCart = inMemoryCart.filter(item => item.id !== productId);
    setInMemoryCart(updatedInMemoryCart);
    updateAsyncStorage(updatedInMemoryCart);
    calculateTotal(); 
  };

  const calculateTotal = () => {
    const totalAmount = inMemoryCart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    setTotal(totalAmount);
  };

  const updateAsyncStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const products = [
    { id: 1, name: 'Product 1', price: 10.99, image: require('./assets/product1.jpg') },
    { id: 2, name: 'Product 2', price: 19.99, image: require('./assets/product2.jpg') },
    // ... more products
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity onPress={() => addProductToCart(item, 1)} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* ... rest of your checkout screen code */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CheckoutScreen;