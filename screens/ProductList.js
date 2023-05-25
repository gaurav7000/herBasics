import React, { useState ,useEffect} from 'react';
import { View, Image, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import Product from '../shared/product';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import HerBasicsAnimation from '../shared/HerBasicsAnimation';
import HerBasicsLoading from '../shared/HerBasicsLoading';
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth > 768 ? 4 : 2;
export default function ProductList({ route, navigation }) {
  const [pickedCategorie, setPickedCategorie] = useState([]);
  const items = useSelector(state => state.items);
  const { id, categorie, img } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = ref(database, `data/${categorie}/`);
        const categoriesSnapshot = await get(fetchedCategories);
        const categoriesData = categoriesSnapshot.val();
        setPickedCategorie(categoriesData);
        setLoading(false); // Set loading to false after data is fetched and loaded
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [categorie]);

  const back = () => {
    navigation.goBack();
  };
  if (loading) {
    return (
      <View style={{ flex: 1, }}>
        <HerBasicsLoading/>
        
     </View>
    );
  }
  return ( 
    <View style={globalStyles.container}>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<>  
          <Image source={{uri: img}} style={{ marginBottom: 20,...globalStyles.image}} />
          <Text style={globalStyles.topText}>{categorie}</Text>
        </>}
        ListFooterComponent={<>
        
          <View style={{paddingBottom:20}}/>
             </>}
      data={pickedCategorie}
        renderItem={({item})=>(
          <Product itemId={item.itemId} title={item.title} price={item.price} ogPrice={item.ogPrice} img={item.img} categorie={item.categorie} availability={item.availability} sizes={item.sizes} />        )}
        keyExtractor={item => item.key}
         contentContainerStyle={{ 
                justifyContent: 'center',
                alignItems: 'center'
              }}
        numColumns={numColumns}
        />     
    </View> 
  );
}; 