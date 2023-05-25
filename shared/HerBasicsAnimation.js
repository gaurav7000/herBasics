import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { globalStyles } from '../styles/global';

const HerBasicsAnimation = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: scaleValue,
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[globalStyles.headerText, styles.text, animatedStyle]}>
        <Text style={globalStyles.headerText}>herBasics</Text> 
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfefb',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HerBasicsAnimation;
