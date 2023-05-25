import React, { useStat } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList,  StyleSheet,  Pressable } from 'react-native';
import { globalStyles } from '../styles/global'; 
import { useSelector,useDispatch } from 'react-redux';
import Card from '../shared/card';  
import { removeItem } from '../redux/userActions';
import { SimpleLineIcons, MaterialIcons,} from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth < 768 ? 104 : 124;
const imageHeight = screenWidth < 768 ? 130 : 150; 

export default function BagScreen({navigation}) { 
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const totalPrice = useSelector(state => state.totalPrice); 
  const handleRemoveItem = (itemToRemove) => {
    dispatch(removeItem(itemToRemove));
  };
  const back = () => {
    navigation.goBack();
  } 
  const renderCartItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.push('ProductScreen', {  itemId: item.itemId, title: item.title, price: item.price, ogPrice: item.ogPrice, img: item.img, sizes: item.sizes, availability: item.availability })}>
        <Card>
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={{ padding: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.price}>{`\u20B9${item.price}`}</Text>
                <Text style={[styles.price, styles.ogPrice]}>{`\u20B9${item.ogPrice}`}</Text>
                <Text style={styles.discount}>{Math.round((1 - item.price / item.ogPrice) * 100)}% off</Text>
              </View>
              <Text style={styles.savings}>You saved {`\u20B9`}{(item.ogPrice - item.price)}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ ...styles.title, marginTop: 10 }}> SIZE: {item.sizes}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  handleRemoveItem(item);
                }}>
                  <Text style={{ ...styles.title, textAlign: 'right', marginTop: 10, color: 'gray' }}>remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {totalPrice !== 0 ? (
        <View style={{ ...globalStyles.container, paddingBottom: 10,paddingRight:5,paddingLeft:5 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" onPress={back} />
              <Text style={{ ...globalStyles.headerText }}>Shopping bag</Text>
            </View>
            <View>
              <Text style={{ color: 'gray', ...globalStyles.headerText }}>
                Step 1/3
              </Text>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            renderItem={renderCartItem}
            keyExtractor={item => item.itemId}
          />
          <View>
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.title}>Item total</Text>
                  <Text style={styles.title}>Delivery fee</Text>
                </View>
                <View>
                  <Text style={{ ...globalStyles.headerText, paddingRight: 20 }}>{`\u20B9`}{totalPrice}</Text>
                  <Text style={styles.title}>Free</Text>
                </View>
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={globalStyles.headerText}>Grand total</Text>
                </View>
                <View>
                  <Text style={{ ...globalStyles.headerText, paddingRight: 20 }}>{`\u20B9`}{totalPrice}</Text>
                </View>
              </View>
            </Card>

            <Card>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.title, color: 'gray' }}>Average delivery time:</Text>
                <Text style={styles.title}>3-15days</Text>
              </View>

              <View style={{ borderRadius: 6, elevation: 80, backgroundColor: '#e7f7e7', shadowOffset: { width: 1, height: 1 }, shadowColor: '#999', shadowOpacity: 0.3, shadowRadius: 2, marginHorizontal: 2, marginVertical: 6, overflow: 'hidden' }}>
                <Text style={{ ...globalStyles.headerText, color: '#17b9a0', padding: 10, textAlign: 'center', fontSize: 16 }}>
                  {`\u20B9${items.reduce((total, item) => total + (item.ogPrice - item.price), 0)}`}  saved so far on this order
                </Text>
              </View>
            </Card>
            <View style={{
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 6,
              elevation: 80,
              backgroundColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowColor: '#999',
              shadowOpacity: 0.3,
              shadowRadius: 2,
              marginHorizontal: 2,
              marginVertical: 5,
              overflow: 'hidden',
            }}>           
              <Pressable 
                onPress={() => navigation.push('Address')}>
                <Text style={{
                  marginHorizontal: 10,
                  marginVertical: 9,
                  fontFamily: 'PlayfairDisplaySC-Bold', fontSize: 20, color: '#fff',
                  textAlign: 'center',
                }}>Check Out</Text>
              </Pressable>         
            </View>
          </View>
        </View>
      ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...globalStyles.container }}>
            <SimpleLineIcons name="handbag" size={60} color="black" />
          <Text style={globalStyles.headerText}>
              Your bag is empty 
          </Text>
          <TouchableOpacity style={globalStyles.button} onPress={()=>navigation.goBack()}>
            <Text> Back to Shop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10
  },
  cardContainer: {
    flexDirection: 'row'
  },
  image: {
    width: imageWidth,
    height: imageHeight
  },
  title: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 13,
    marginTop: 5,
    paddingLeft: 10
  },
  price: {
    fontFamily: 'PlayfairDisplaySC-Bold', 
    fontSize: 18,
    marginTop: 5,
    paddingLeft: 10
  },
  ogPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',    
  },
  discount: {
    color: 'green',
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 20,
    marginTop: 5,
    paddingLeft: 10
  },
  savings: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 16,
    marginTop: 5,
    paddingLeft: 10,
    color: 'green',
  },
  modalView: {
    backgroundColor: '#fbefd2',
    width:360,
    margin: 20, 
    borderRadius: 10,
    padding: 25, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  button: {
    width: 150,
    borderRadius: 5,
    padding: 10,
    elevation: 2, 
  },
  buttonOpen: {
    backgroundColor: '#4b473d',
  }, 
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,  
  },
});