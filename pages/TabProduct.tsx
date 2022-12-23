import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import Constants from 'expo-constants';
import { IProduct, ProBilgiler } from '../models/IProduct';
import { allProduct } from '../services/ProductService';
import ProductItem from '../components/ProductItem';
import CustomHeader from '../components/CustomHeader';


export default function TabProduct( { navigation }: any ) {

  navigation.setOptions({
    header: () => <CustomHeader/>
  })


  const [arr, setArr] = useState<ProBilgiler[]>([])
  useEffect(() => {
    allProduct('0').then(res => {
      setArr( res.data.Products[0].bilgiler )
    })
  },[])

  const [isRefresh, setIsRefresh] = useState(false)
  const onRefresh = () => {
    setIsRefresh(true)
    allProduct('0').then(res => {
      setArr( res.data.Products[0].bilgiler )
      setIsRefresh(false)
    })
  }
  const refresh =
<RefreshControl  refreshing={isRefresh}  onRefresh={ onRefresh }  />
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={arr}
        renderItem={ ({item}) => <ProductItem pro={item} /> }
        refreshControl={ refresh }
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
    marginTop: -30,
  }
});
