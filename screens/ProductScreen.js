import React, { useState } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { globalStyles } from '../styles/global'; 
import Product from '../shared/product';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/userActions'; 
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
export default function ProductScreen({ route, navigation }) {
 
  const dispatch = useDispatch(); 
  const { itemId, title, price, ogPrice, img, categorie, availability, sizes } = route.params;
  const screenWidth = Dimensions.get('window').width; 
  const imageWidth = screenWidth < 496 ? 350 : 350;
  const imageHeight = screenWidth < 496 ? 480 : 480;
  const direction = screenWidth < 740 ? 'column' : 'row';
  const sidePadding = screenWidth < 740 ? 0 : 80;
  const items = useSelector(state => state.items);
  const itemAdded = items.some(item => item.itemId === itemId);
  const handleAddItem = () => { 
    const newItem = {
      itemId, title, price, ogPrice, img, categorie, sizes, availability
    };
    dispatch(addItem(newItem));
  };
  const handleRemoveItem = () => {
    const itemToRemove = items.find(item => item.itemId === itemId);
    dispatch(removeItem(itemToRemove));
  };
  const back = () => {
    navigation.goBack();
  }
  return (
    <View style={{...globalStyles.container }}>
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name="arrow-back-ios" size={24} onPress={back} color="black" />
        <Text style={{ textAlignVertical: 'bottom', fontFamily: 'PlayfairDisplaySC-Regular', fontSize: 13 }}>🪡Made to celebrate your curves</Text>
        <TouchableOpacity style={{ right: 70, position: 'absolute' }} onPress={() => navigation.push('Bag')}>
          <SimpleLineIcons name="handbag" size={24} color="black" />
        </TouchableOpacity>
        {items.length == 0 ? (
          <></>
        ) : (
          <TouchableOpacity style={{ right: 57, bottom: 28, position: 'absolute' }} onPress={() => navigation.push('Bag')}>
              <Text style={globalStyles.badge}>
              {items.length}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ right: 10, position: 'absolute' }}>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 45, height: 45, borderRadius: 50, }}
          />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: direction, justifyContent: 'center', alignItems: 'center', paddingBottom: 20, }}>          
          <Image source={{ uri: img }} style={{ width: imageWidth, height: imageHeight }} />       
          <View style={{padding:sidePadding}}>
            <Text style={globalStyles.productText}>{title}</Text>
            <Text
              style={{
                fontFamily: 'PlayfairDisplaySC-Bold',
                fontSize: 14,
                marginTop: 5,
                color: 'gray',
              }}>
              Per piece
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={globalStyles.productText}>{`\u20B9${price}`}</Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: 'gray',
                  ...globalStyles.productText,
                }}>
                {`\u20B9${ogPrice}`}
              </Text>
              <Text style={{ color: 'green', ...globalStyles.productText }}>
                {Math.round((1 - price / ogPrice) * 100)}% off
              </Text>
            </View>
            <Text style={{ paddingTop:20,...globalStyles.productText}}>Available size</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Text style={globalStyles.sizeStyle}>{sizes}</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
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

        <Text style={{ ...globalStyles.textCategories, paddingBottom:10}}>You might also like it ..</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >        
        <FlatList
          data={[
              { key: 'wd1', itemId: 'item8', categorie: 'Bottoms', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 2654, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage16.jpg?alt=media&token=03bede4c-c18e-4d94-82f9-52830e11107f', sizes: 'S', availability: true, },
              { key: 'df2', itemId: 'item9', categorie: 'Dresses', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 7546, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage1.jpg?alt=media&token=2b271213-9c6e-4ff6-945d-40ce259a364a', sizes: 'S', availability: true, },
              { key: 'xe3', itemId: 'item10', categorie: 'Activewear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 3564, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage3.jpg?alt=media&token=e9a120a5-0eb9-408e-99be-a681f2907679', sizes: 'S', availability: false, },
              { key: 'c4g', itemId: 'item11', categorie: 'Outerwear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 1456, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage5.jpg?alt=media&token=65543e0b-0a31-4f16-b031-e19200fea2c9', sizes: 'S', availability: false, },
              { key: 'wd1', itemId: 'item12', categorie: 'Bottoms', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 2654, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage4.jpg?alt=media&token=ab930ee5-cd8c-45f7-b767-2ccedbd5c723', sizes: 'S', availability: true, },
              { key: 'df2', itemId: 'item13', categorie: 'Dresses', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 7546, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage6.jpg?alt=media&token=e0a1ca93-bbff-4d98-ad9d-b147b637df78', sizes: 'S', availability: true, },
              { key: 'xe3', itemId: 'item14', categorie: 'Activewear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 3564, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage7.jpg?alt=media&token=a0452b98-9717-46ab-a57e-f4533e13d25a', sizes: 'S', availability: false, },
              { key: 'c4g', itemId: 'item15', categorie: 'Outerwear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 1456, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage9.jpg?alt=media&token=35829d99-8a94-42f7-83ce-b8eebef7fcf2', sizes: 'S', availability: false, },
              { key: '51', itemId: 'item1', categorie: 'Tops', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 2654, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage2.jpg?alt=media&token=c56e8841-2a99-44c1-b972-a31f7e052b5c', sizes: 'S', availability: true, },
              { key: '22', itemId: 'item2', categorie: 'Bottoms', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 7546, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage10.jpg?alt=media&token=7ed13186-b9f6-4b99-b35c-b1e395ad9ac9', sizes: 'S', availability: false, },
              { key: '53', itemId: 'item3', categorie: 'Dresses', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 3564, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage11.jpg?alt=media&token=f6b50b6e-537d-498f-863c-b5234113f167', sizes: 'S', availability: true, },
              { key: '42', itemId: 'item4', categorie: 'Activewear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 1456, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage12.jpg?alt=media&token=c29ba50e-a084-4920-aa39-be45182c1b5f', sizes: 'S', availability: false, },
              { key: '5w3', itemId: 'item5', categorie: 'Outerwear', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 1254, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage13.jpg?alt=media&token=67ef0ab1-5125-42f6-a6f2-aa23a8157804', sizes: 'S', availability: false, },
              { key: '65', itemId: 'item6', categorie: 'Accessories', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 1500, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage14.jpg?alt=media&token=9a529868-7cc2-4b80-a7fd-141eec064bfc', sizes: 'S', availability: true, },
              { key: '73', itemId: 'item7', categorie: 'Tops', title: 'Laurent Cerrer Black Shirt', price: 999, ogPrice: 2500, img: 'https://firebasestorage.googleapis.com/v0/b/her-basics.appspot.com/o/product_images%2Fimage15.jpg?alt=media&token=eee8bad0-b51b-4c1f-88aa-777931d499f2', sizes: 'S', availability: false, },             
          ]}
          renderItem={({ item }) => ( <Product itemId={item.itemId} title={item.title} price={item.price} ogPrice={item.ogPrice} img={item.img} categorie={item.categorie} availability={item.availability} sizes={item.sizes} />)}
          keyExtractor={item => item.key}        
          numColumns={50}
        />       
        </ScrollView>   
        <View style={{ paddingBottom: 50 }}></View> 
      </ScrollView>
    </View>
  );
}