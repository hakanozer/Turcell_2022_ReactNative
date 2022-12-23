import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProOrder } from '../models/IOrders';

export default function OrderItem ( item: { pro: ProOrder } ) {

  const navigation = useNavigation();

  return (
        <View style={styles.itemView}>
          <View style={styles.itemImageView}>
            <Image resizeMode='contain' style={styles.itemImage} source={{uri: item.pro.normal }} />
          </View>
          <View style={styles.itemTextView} >
            <Text style={styles.itemTitle}>{item.pro.urun_adi}</Text>
            <Text style={styles.itemPrice}>{item.pro.fiyat}</Text>
          </View>
        </View>
  )
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
  }
});