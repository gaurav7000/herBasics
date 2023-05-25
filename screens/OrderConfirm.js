import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

const OrderConfirm = ({ navigation }) => {
  const handleBackToHome = () => {
    navigation.navigate('Home');  
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/success.png')}
        style={{ width: 200, height: 200, borderRadius: 50 }}
      />
      <Text style={globalStyles.headerText}>Your Order Has Been Placed!</Text>
      <Text style={globalStyles.text}>Thank you for your purchase. Your order has been successfully placed.</Text>
      <Text style={globalStyles.text}>We will send you a confirmation email shortly with the details of your order.</Text>
      <TouchableOpacity onPress={handleBackToHome} style={{...globalStyles.button,marginTop:40}}>
        <Text style={globalStyles.buttonText}>Let's get some more clothes for you? huh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfefb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirm;
