import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getData } from '../utils/AsyncStore';
import { orderList } from '../services/ProductService';
import { ProOrder } from '../models/IOrders';
import OrderItem from '../components/OrderItem';


export default function Order({ route, navigation }: any) {

  const [arr, setArr] = useState<ProOrder[]>([])

  useEffect(()=> {
    getData().then(user => {
      if (user) {
        orderList(user.userId).then(res => {
          setArr(res.data.orderList)
        })
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      
      <TouchableOpacity  hitSlop={{top: 30, left: 30, bottom: 30, right: 20}} onPress={() => navigation.goBack()}>
        <AntDesign name="left" color='#4287f5' size={30} />
      </TouchableOpacity>

      <FlatList 
        data={arr}
        renderItem= { ({item}) => <OrderItem pro={item} /> }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
  },
});
