import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = ({ onClose }) => {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
    onClose(); // Close the drawer after navigation
  };
  const [lineLength, setLineLength] = useState(100);
  return (
    <View style={styles.drawerContainer}>
      <Image source={require('./assets/Close.png')} style={styles.close}/>
    <Text  style={styles.ourStoryTitle}> ERIC  ATSU </Text>
    <View style={styles.lineContainer}>
        <View style={[styles.line, { width: lineLength }]} />
    </View>    
      <TouchableOpacity onPress={() => handleNavigation('Home')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Store</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Cart')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Location</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Blog')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Blog</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Jewelry')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Jewelry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Electronic')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Electronic</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Clothing')} style={styles.drawerItem}>
        <Text style={styles.drawerText}>Clothing</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, // Add padding for spacing
    marginTop: 50,
  },
  drawerItem: {
    marginBottom: 20, // Add spacing between items
  },
  drawerText: {
    fontSize: 20, // Adjust font size as needed
   
    textAlign: 'left',
  },
  close : {
marginBottom: 24,
  },
  ourStoryTitle: {
    fontSize: 21,
    marginBottom: 8, 
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 20,
   
    marginBottom: 30,
    marginLeft:7,
    
  },
  line: {
   height: 1,
    backgroundColor: 'orange',
    width:1,
    },
});

export default DrawerContent;