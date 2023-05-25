import React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/userActions';

export default function Product({  itemId, title, price, ogPrice, img, categorie, availability, sizes }) {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth < 768 ? 164 : 254;
  const imageHeight = screenWidth < 768 ? 202 : 292;
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const handleAddItem = () => { 
    const newItem = {
      itemId, title, price, ogPrice, img, categorie, availability, sizes
    };
    dispatch(addItem(newItem));
  };
  const handleRemoveItem = () => {
    const itemToRemove = items.find(item => item.itemId === itemId);
    dispatch(removeItem(itemToRemove));
  };

  const itemAdded = items.some(item => item.itemId === itemId);

  return (
    <View style={{ padding: 5 }}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.push('ProductScreen', { itemId, title, price, ogPrice, img, categorie, availability, sizes }); }}>
            <Image
              source={{ uri: img }}
              style={{ width: imageWidth, height: imageHeight }}
            />
          </TouchableOpacity>
          <Text style={globalStyles.text}>{title}</Text>
        </View>
        {ogPrice && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={globalStyles.text}>{`\u20B9${price}`}</Text>
            <Text style={{
              textDecorationLine: 'line-through',
              color: 'gray',
              fontFamily: 'PlayfairDisplay-Regular',
            }}>{`\u20B9${ogPrice}`}</Text>
            <Text style={globalStyles.text}>
              {Math.round((1 - price / ogPrice) * 100)}% off
            </Text>
          </View>
        )}

      </View>
      <View>
        <View>
          {!itemAdded && availability ? (
            <TouchableOpacity style={globalStyles.button} onPress={handleAddItem}>
              <Text style={globalStyles.buttonText}>Add to bag</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[globalStyles.button, !availability && { backgroundColor: 'gray' }]} disabled={!availability} onPress={() => {
              handleRemoveItem();
            }}>
              <Text style={globalStyles.buttonText}>{availability ? 'Remove from bag' : 'Out of stock'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
