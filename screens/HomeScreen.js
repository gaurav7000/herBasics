import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import Product from '../shared/product';
import { useSelector } from 'react-redux'; 
import { ref, get} from "firebase/database";
import { database } from '../firebase';
import HerBasicsAnimation from '../shared/HerBasicsAnimation';
import { StatusBar } from 'expo-status-bar';
const HomeScreen = ({navigation}) => {

  const items = useSelector(state => state.items);  
  const screenWidth = Dimensions.get('window').width; 
  const [fetchCategories, setFetchCategories] = useState([])
    
  const [newArrivesData, setNewArrivesData] = useState([]) 
  const [loading, setLoading] = useState(true);  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNewArrives = ref(database, 'data/newArrives/');
        const fetchedCategories = ref(database, 'data/categorie/');

        const newArrivesSnapshot = await get(fetchedNewArrives);
        const categoriesSnapshot = await get(fetchedCategories);

        const newArrivesData = newArrivesSnapshot.val();
        const categoriesData = categoriesSnapshot.val();

        setNewArrivesData(newArrivesData);
        setFetchCategories(categoriesData);

        setLoading(false); 
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    fetchData();
  }, []);
 
  const imageCatWidth = screenWidth < 768 ? 155 : 270;
  const imageCatHeight = screenWidth < 768 ? 155 : 270; 
  const numColumns = screenWidth > 768 ? 3 : 2; 
  if (loading) {
    return (
      <View style={{ flex: 1, }}>
        <HerBasicsAnimation/>
      </View>
    );
  }
  return (    
  <View style={{...globalStyles.container, paddingBottom:20}}>    
      <StatusBar style="dark" backgroundColor='#fbfefb' />    
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ paddingLeft: 12,textAlignVertical: 'bottom', fontFamily: 'PlayfairDisplaySC-Regular' , fontSize:13}}>🪡Made to celebrate your curves</Text>
        <TouchableOpacity style={{ right: 70, position: 'absolute' }} onPress={()=>navigation.push('Bag')}>
          <SimpleLineIcons name="handbag" size={24} color="black" />
        </TouchableOpacity>
        {items.length == 0 ? (
           <></>
        ):( 
            <TouchableOpacity style={{ right: 57, bottom: 28, position: 'absolute' }} onPress={() => navigation.push('Bag')}>
              <Text style={globalStyles.badge}>
                {items.length}
              </Text>
            </TouchableOpacity>
        )}          
        <View style={{ right: 10, position: 'absolute' }}>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 45, height: 45, borderRadius: 50,}}
          />
        </View>
      </View>

  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    
    <View>      
          <Text style={globalStyles.headerText}>New Arrives ! ! !</Text>
    </View>

    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      flexDirection: 'row',
      marginBottom: 10,
    }}>
      <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}           
      >
        <FlatList
          data={newArrivesData}
          renderItem={({ item }) => (
            <Product itemId={item.itemId} title={item.title} price={item.price} ogPrice={item.ogPrice} img={item.img} categorie={item.categorie} availability={item.availability} sizes={item.sizes}/>
              )}
              keyExtractor={item => item.key}
              style={{ paddingTop: 7, marginBottom: 7 }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              showsVerticalScrollIndicator={false}
              numColumns={50}
            />

          </ScrollView>
        </View> 
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={globalStyles.headerText}>Top categories</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={fetchCategories}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('ProductList', { id: item.id, categorie: item.categorie, img: item.img })}>
                    <View style={{ padding: 10 }}>
                      <View>
                        <Image
                          source={{ uri: item.img }}
                          style={{
                            width: imageCatWidth,
                            height: imageCatHeight,
                            borderRadius: 45
                          }}
                        />
                        <Text style={globalStyles.textCategories}>{item.categorie}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>          
                )}
                keyExtractor={item => item.key}
                style={{ paddingTop: 7, marginBottom: 7 }}
                contentContainerStyle={{
                  flex: 1,                  
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
                numColumns={numColumns}
              />
            </ScrollView>
          </View> 
        </View>

        <View style={globalStyles.footer}>
          <Text style={globalStyles.textFooter}>
            We're a fashion brand that celebrates women of all sizes and shapes. Our clothes are
            designed to make you feel comfortable and confident, so you can rock your curves with
            pride! Whether you're looking for a dress for a special occasion, or just something
            casual to wear around town, we've got you covered. Shop our collection now and join the
            curve revolution!
          </Text>
        </View>
        
      </ScrollView>
         
    </View>
  );
}; 

export default HomeScreen;