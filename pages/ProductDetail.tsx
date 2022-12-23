import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { ProBilgiler } from '../models/IProduct';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getData } from '../utils/AsyncStore';
import { addBasket } from '../services/ProductService';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { toastConfig } from '../utils/ToastConfig';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'
import { ILikeAction } from '../useRedux/LikesReducer';
import { LikesEnum } from '../useRedux/LikesEnum';
import { StateType } from '../useRedux/Store';

const appHight = Dimensions.get('screen').height

export default function ProductDetail({ route, navigation }: any) {

  // redux Dispatch
  const dispatch = useDispatch()
  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )

  const { item } = route.params
  const pro = item as ProBilgiler
  const images = pro.images
  const [bigImage, setBigImage] = useState(images[0].normal)
  const [basketStatus, setBasketStatus] = useState(true)
  const [statusBarStatus, setStatusBarStatus] = useState(false)
  const [isHeart, setIsHeart] = useState(false)

  // fnc Addd Basket
  const fncAddBasket = () => {
    getData().then(user => {
      if (user) {
        setBasketStatus(false)
        addBasket(user.userId, pro.productId).then( res => {
          const status = res.data.order[0].durum as boolean
          if (status) {
            setStatusBarStatus(true)
            Toast.show({type: 'customToast', text1: 'Basket', text2: "Add Basket Success", onHide: () => {
              setStatusBarStatus(false)
            }})
          }
        }).finally( () => {
          setBasketStatus(true)
        })
      }
    })
  }

  const fncHeart = () => {
    const status = isHeart
    setIsHeart(!isHeart)

    if (!status) {
      // Add
      let sendItem: ILikeAction = {
          type: LikesEnum.LIKE_ADD,
          payload: pro
      }
      dispatch(sendItem)
    }else {
      // remove
      let sendItem: ILikeAction = {
          type: LikesEnum.LIKE_REMOVE,
          payload: pro
      }
      dispatch(sendItem)
    }
  }

  useEffect(() => {
    const index = likesData.findIndex((item) => item.productId === pro.productId)
    if (index > -1) {
      setIsHeart(true)
    }
  }, [] )

  return (
    <View style={styles.container}>
      <StatusBar hidden={statusBarStatus} />
      <TouchableOpacity  hitSlop={{top: 30, left: 30, bottom: 30, right: 20}} onPress={() => navigation.goBack()}>
        <AntDesign name="left" color='#4287f5' size={30} />
      </TouchableOpacity>
      
      <ScrollView style={styles.viewScrollView} showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={fncHeart} style={styles.heartIcon} hitSlop={{top: 40, left: 40, right: 40, bottom: 40}}>
         <MaterialCommunityIcons name={isHeart === true ? 'heart' : 'heart-outline'} size={30} />
        </TouchableOpacity>

        <Image style={styles.bigImage} source={{ uri: bigImage }} resizeMode='contain' />
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false} >
          <View style={styles.thumbView}>
            { images.map( (item, index) => 
              <TouchableOpacity onPress={() => setBigImage(item.normal)} ><Image style={styles.thumbImage} source={{uri: item.thumb}} resizeMode='contain' /></TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <Text style={styles.appTitle}>{pro.productName}</Text>
        <Text style={styles.appPrice}>{pro.price}₺</Text>
        <Text>{pro.description}</Text>
      </ScrollView>

      <TouchableOpacity disabled={!basketStatus} onPress={fncAddBasket}>
        <View style={styles.basketView}>
          <Text style={styles.basketText}>Add Basket</Text>
        </View>
      </TouchableOpacity>
      <Toast config={toastConfig} />
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
  viewScrollView: {

  },
  scrollView: {
    marginTop: 10,
    marginBottom: 10,
    height: 90,
    flexGrow:0
  },
  heartIcon: {
    position: 'absolute',
    right: 5,
    zIndex: 1,
    height: 40,
  },
  bigImage: {
      width: '100%',
      height: appHight / 3.5,
      marginTop: 10,
  },
  thumbView: {
      flexDirection: 'row',
  },
  thumbImage: {
    width: 77,
    height: 77,
    borderWidth: 0.5,
    borderColor: '#6b6a6a',
    margin: 5,
    padding: 5,
  },
  appTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  appPrice: {
    fontSize: 16,
    color: '#fa7414',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  basketView: {
    backgroundColor: '#f76425',
    padding: 7,
    borderRadius: 5,
  },
  basketText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  }
});
