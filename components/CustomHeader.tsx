import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../utils/AsyncStore';
import { Bilgiler } from '../models/IUserLogin';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function CustomHeader () {

  const navigation = useNavigation();
  const [user, setUser] = useState<Bilgiler>();
  useEffect(() => {
    getData().then(item => {
      if (item) {
        setUser(item)
      }
    })
  }, [])

  return (
    <View>
     {user && 
        <View style={styles.contianer}>
          <View><Text></Text></View>
          <View><Text style={styles.headerTitle} >{user.userName} {user.userSurname}</Text></View>
          <View style={{marginRight: 10,}}>
            <TouchableOpacity onPress={() => navigation.navigate('Order')} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
              <SimpleLineIcons name='basket' size={20} color='#ffffff' />
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contianer: {
    height: 80,
    width: '100%',
    backgroundColor: '#4287f5',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
  }
})