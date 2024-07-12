import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, navigation, } from 'react-native';

import Header from './HSP.js';


const ProductDetails = ({ route }) => {
  
  const product = route.params.product;
  const [lineLength] = useState(310);
  return (
    <SafeAreaView style={styles.safeArea}>  
    <Header navigation={navigation} />
    <ScrollView style={styles.container}>
      <View style={styles.productContainer}>
      
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.mc}>  
        <Text style={styles.productName}>{product.name}</Text>
        <Image source={require('./assets/Export.png')} style={styles.icon} />
        </View>
        <Text style={styles.productDescription}>Recycle Boucle Knit Cardigan Pink</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Materials</Text>
          <Text style={styles.detailsText}>We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.</Text>
        </View>
        <View style={styles.materialsContainer}>
        <View style={styles.mc}>
         <Image source={require('./assets/Do Not Bleach.png')}  />
          <Text style={styles.materialsText}>Do not use bleach. </Text>
          </View>
       <View style={styles.mc}> 
          <Image source={require('./assets/Do Not Tumble Dry.png')}  />
          <Text style={styles.materialsText}> Do not tumble dry. </Text>
        </View>
        <View style={styles.mc}> 
          <Image source={require('./assets/Do Not Wash.png')} />
          <Text style={styles.materialsText}>  Dry clean with tetrachloroethylene</Text>
        </View> 
        <View style={styles.mc}> 
          <Image source={require('./assets/Iron Low Temperature.png')}  />
          <Text style={styles.materialsText}>   Iron at a maximum of 110ºC/230ºF</Text>
          </View> 
        </View>


        <View style={styles.lineContainer}>
        <View style={[styles.line, { width: lineLength }]} />
        </View>

        <View style={styles.shippingContainer}>
        <View style={styles.mc}> 
        <Image source={require('./assets/Shipping.png')}  />
          <Text style={styles.shippingTitle}>Free Flat Rate Shipping</Text>
          <Image source={require('./assets/Up.png')} style={styles.icons} />
          </View >
          <Text style={styles.shippingText}>Estimated to be delivered on </Text>
          <Text style={styles.shippingText}> 09/11/2021 - 12/11/2021.</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
        <View style={styles.mc}>    
        <Image source={require('./assets/Plus.png')}  style={styles.cartIcon}/>
          <Text style={styles.addToCartText}>Add to basket</Text>
          <Image source={require('./assets/Heart.png')}  style={styles.cartIcons}/>
         </View> 
     </TouchableOpacity>
      </View>
    </ScrollView>
    
    </SafeAreaView> 
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
icons : {
  marginLeft : 60,
},
icon : {
  marginLeft : 200,
},
  mc : {
flexDirection: 'row',
paddingHorizontal: 5,
color: '#808080',

  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft:10,
    
  },
  line: {
   
    height: 1,
    backgroundColor: 'gray',
    color: '#808080',
    width:1,
  },
  productContainer: {
    padding: 20,
    width: '100%', // Adjust the productContainer width
  },
  productImage: {
    width: '100%', // Or use a fixed width like `width: 300`
    height: 300, 
    resizeMode: 'streatch', 
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#808080',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#808080',
  },
  materialsContainer: {
    marginBottom: 20,
   
  },
  materialsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  materialsText: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 10,
    color: '#808080',
  },
  shippingContainer: {
    marginBottom: 20,
  },
  shippingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  shippingText: {
    fontSize: 16,
    paddingLeft: 40,
    color: '#808080',
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'left',
    marginTop : 150,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft : 3,
   
  },
  cartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: 25,
  },
  cartIcons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft: 110,
  },
});

export default ProductDetails;