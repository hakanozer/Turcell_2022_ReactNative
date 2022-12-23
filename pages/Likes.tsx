import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'
import { IProduct, ProBilgiler } from '../models/IProduct';
import { allProduct } from '../services/ProductService';
import ProductItem from '../components/ProductItem';
import CustomHeader from '../components/CustomHeader';
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../useRedux/Store';
import { ILikeAction } from '../useRedux/LikesReducer';
import { LikesEnum } from '../useRedux/LikesEnum';


export default function Likes() {

  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )
  const disPatch = useDispatch() 

  return (
    <View style={styles.container}>
      <FlatList 
        data={likesData}
        renderItem={ ({item}) => <ProductItem pro={item} /> }
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
