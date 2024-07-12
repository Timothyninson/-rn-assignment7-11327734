import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Homescreen.js';
import DrawerContent from './DrawerContent.js'; // Your drawer content component
import BlogScreen from './BlogScreen.js';
import JewelryScreen from './JewelryScreen.js';
import ElectronicScreen from './ElectronicScreen.js';
import ClothingScreen from './ClothingScreen.js';
import Cart from './Cart.js';
import ProductDetails from './ProductDetails.js'; // Import ProductDetails

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} onClose={closeDrawer} />}
          drawerStyle={{ backgroundColor: '#fff' }}
          drawerType="front"
          drawerGesturesEnabled={false}
          initialRouteName="Home" // Set your initial screen
        >
          <Drawer.Screen name="Home" component={HomeStack} options={{ headerShown: false, drawerLabel: 'Home' }} />
          <Drawer.Screen name="Blog" component={BlogScreen} options={{ headerShown: false, drawerLabel: 'Blog' }} />
          <Drawer.Screen name="Jewelry" component={JewelryScreen} options={{ headerShown: false, drawerLabel: 'Jewelry' }} />
          <Drawer.Screen name="Electronic" component={ElectronicScreen} options={{ headerShown: false, drawerLabel: 'Electronic' }} />
          <Drawer.Screen name="Cart" component={Cart} options={{ headerShown: false, drawerLabel: 'Cart' }} />
          <Drawer.Screen name="Clothing" component={ClothingScreen} options={{ headerShown: false, drawerLabel: 'Cart' }} />
        </Drawer.Navigator>

        {/* Drawer content is only visible when drawerOpen is true */}
        {drawerOpen && (
          <View style={styles.drawerContainer}>
            <DrawerContent onClose={closeDrawer} />
          </View>
        )}
      </View>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 10, // Ensure drawer is on top
  },
});

export default App;