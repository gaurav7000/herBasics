import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ref, push } from "firebase/database";
import { database } from '../firebase';
import { useSelector } from 'react-redux';

const AddressScreen = ({ navigation }) => {
  
  const orderDataRef = ref(database, ' user/orderData');
  const items = useSelector(state => state.items);
  const totalPrice = useSelector(state => state.totalPrice); 

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    phoneNumber: false,
    pincode: false,
    address: false,
    landmark: false,
    city: false,
    state: false,
  });

  const handleNameChange = (text) => {
    setName(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      name: text === '',
    }));
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      phoneNumber: text === '',
    }));
  };

  const handlePincodeChange = (text) => {
    setPincode(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      pincode: text === '',
    }));
  };

  const handleAddressChange = (text) => {
    setAddress(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      address: text === '',
    }));
  };

  const handleLandmarkChange = (text) => {
    setLandmark(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      landmark: text === '',
    }));
  };

  const handleCityChange = (text) => {
    setCity(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      city: text === '',
    }));
  };

  const handleStateChange = (text) => {
    setState(text);
    setValidationErrors((prevState) => ({
      ...prevState,
      state: text === '',
    }));
  };

  const handleSaveAddress = () => {
    const fields = {
      name,
      phoneNumber,
      pincode,
      address,
      landmark,
      city,
      state,
    };

    const errors = {};

    for (const key in fields) {
      if (fields[key] === '') {
        errors[key] = true;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const orderItems = items.map(item => ({
      key: item.key || '', 
      itemId: item.itemId || '',  
      title: item.title || '', 
      size: item.size || '', 
      price: item.price || '',
      categorie: item.categorie || '',
      img: item.img || '',
      availability: item.availability || ''
    }));

    const order = {
      customer_name: name,
      phoneNumber,
      shipping_address: {        
        address,
        landmark,
        city,
        state,
        pincode,
        country
      },
      items: orderItems,
      payment_method: 'Cash on delivery',
      total_amount: totalPrice,
      order_date: new Date().toISOString(),
    };

    push(orderDataRef, order);
    navigation.push('OrderConfirm');
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.header}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" onPress={back} />
          <Text style={styles.headerText}>Enter shipping details</Text>
        </View>

        <Text style={styles.labelText}>Full name</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.name && styles.inputError,
          ]}
          value={name}
          onChangeText={handleNameChange}
        />

        <Text style={styles.labelText}>Mobile number</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.phoneNumber && styles.inputError,
          ]}
          value={phoneNumber}
          maxLength={10}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>Flat, House no., Building, Company, Apartment</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.address && styles.inputError,
          ]}
          value={address}
          onChangeText={handleAddressChange}
        />

        <Text style={styles.labelText}>Area, Street, Sector, Village</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.landmark && styles.inputError,
          ]}
          value={landmark}
          onChangeText={handleLandmarkChange}
        />

        <Text style={styles.labelText}>Town/City</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.city && styles.inputError,
          ]}
          value={city}
          onChangeText={handleCityChange}
        />

        <Text style={styles.labelText}>Pin code</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.pincode && styles.inputError,
          ]}
          value={pincode}
          onChangeText={handlePincodeChange}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>State</Text>
        <TextInput
          style={[
            styles.input,
            validationErrors.state && styles.inputError,
          ]}
          value={state}
          onChangeText={handleStateChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
          <Text style={{
            ...styles.headerText,
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
          }}>Place your order!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 35,
    backgroundColor: '#fbfefb',
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 25,
  },
  headerText: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 20,
  },
  labelText: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 12,
    paddingBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddressScreen;
