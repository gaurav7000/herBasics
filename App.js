import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from './screens/HomeScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import ProductList from './screens/ProductList';
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import  BagScreen from './screens/BagScreen';
import AddressScreen from './screens/AddressScreen';  
import OrderConfirm from './screens/OrderConfirm';

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlayfairDisplaySC-Regular': require('./assets/fonts/PlayfairDisplaySC-Regular.ttf'),
    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplaySC-Bold': require('./assets/fonts/PlayfairDisplaySC-Bold.ttf'),
    'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplaySC-Italic': require('./assets/fonts/PlayfairDisplaySC-Italic.ttf'),
    'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
  });

  const onFontsLoaded = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch((error) => console.warn(error));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createSharedElementStackNavigator();

  return (
    <Provider store={store}>      
      <NavigationContainer onReady={onFontsLoaded}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />   
          <Stack.Screen name="Bag" component={BagScreen} options={{ headerShown: false }} />   
          <Stack.Screen name="Address" component={AddressScreen} options={{ headerShown: false }} />     
          <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{ headerShown: false }} />  
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}