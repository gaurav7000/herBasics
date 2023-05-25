import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 80,
    backgroundColor: '#fbfefb',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#999',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 5,
    overflow: 'hidden',
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 9,
  }
});
