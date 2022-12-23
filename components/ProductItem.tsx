import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProBilgiler } from '../models/IProduct';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function ProductItem(item: { pro: ProBilgiler }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { item: item.pro })}>
      <Animatable.View animation="fadeInRight" style={styles.itemView}>
        <View style={styles.itemImageView}>
          <Image
            resizeMode="contain"
            style={styles.itemImage}
            source={{ uri: item.pro.images[0].normal }}
          />
        </View>
        <View style={styles.itemTextView}>
          <Animatable.Text animation="rubberBand" style={styles.itemTitle}>{item.pro.productName}</Animatable.Text>
          <Text style={styles.itemPrice}>{item.pro.price}</Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginTop: 5,
    marginBottom: 5,
  },
  itemImageView: {
    marginRight: 5,
    marginBottom: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemTextView: {
    marginLeft: 5,
  },
  itemTitle: {
    fontSize: 20,
  },
  itemPrice: {
    color: '#063a8c',
    fontWeight: 'bold',
  },
});
