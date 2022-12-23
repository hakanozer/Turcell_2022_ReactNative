import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';
import { deleteData, getData } from '../utils/AsyncStore';
import {StackActions} from '@react-navigation/native';
import { Hoshi } from 'react-native-textinput-effects';
import { userUpdate } from '../services/ProfileService';
import MapView, {Marker} from 'react-native-maps';


export default function TabProfile( { navigation }: any ) {

  const [updateText, setUpdateText] = useState('Update') 
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(()=> {
    getData().then(user => {
      if (user) {
        setName(user.userName)
        setSurname(user.userSurname)
        setPhone(user.userPhone)
        setEmail(user.userEmail)
      }
    })
  }, [])

  const fncLogout = () => {
    deleteData().then(status => {
      if (status === true) {
        navigation.dispatch(
          StackActions.replace('LoginStack')
        );
      }
    })
  }

  const update = () => {
    if (name === '' || surname === '' || phone === '' || email === '' || password === '') {
      console.log("All Input Empty!")
    }else {
      getData().then(user => {
        if (user) {
          setUpdateText('Updating...')
          const serverObj = userUpdate(user.userId, name, surname, phone, email, password)
          serverObj.then(res => {
            const status = res.data.user[0].durum as boolean
            if (status) {
              setUpdateText('Update Success')
              setTimeout(() => {
                fncLogout()
              }, 3000)
            }
          })
        }
      })
      
    }
    
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.imageView}>
        <Image style={styles.profileImage} source={require('../assets/no_image.png')} />
      </View>
      <Hoshi
        label={'Name'}
        borderColor={'#4287f5'}
        borderHeight={1}
        inputPadding={16}
        backgroundColor={'#ffffff'}
        value={name}
        onChangeText={(txt) => setName(txt)}
      />
      <Hoshi
        label={'Surname'}
        borderColor={'#4287f5'}
        borderHeight={1}
        inputPadding={16}
        backgroundColor={'#ffffff'}
        value={surname}
        onChangeText={(txt) => setSurname(txt)}
      />
      <Hoshi
        label={'Phone'}
        borderColor={'#4287f5'}
        borderHeight={1}
        inputPadding={16}
        backgroundColor={'#ffffff'}
        value={phone}
        onChangeText={(txt) => setPhone(txt)}
        keyboardType='phone-pad'
      />
      <Hoshi
        label={'Email'}
        borderColor={'#4287f5'}
        borderHeight={1}
        inputPadding={16}
        backgroundColor={'#ffffff'}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        keyboardType='email-address'
      />
      <Hoshi
        label={'Password'}
        borderColor={'#4287f5'}
        borderHeight={1}
        inputPadding={16}
        backgroundColor={'#ffffff'}
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        secureTextEntry
      />
      
      <TouchableOpacity onPress={update}>
        <View style={[styles.buttonView, { backgroundColor: '#f58a42' } ]}>
          <Text style={styles.buttonText}>{updateText}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={fncLogout}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableOpacity>

      <MapView
        style={{ height: 200,}}
        initialRegion={{
          latitude: 41.0124223,
          longitude: 28.9361883,
          latitudeDelta: 0.2122,
          longitudeDelta: 0.2121,
        }}
      >
        <Marker
          coordinate={{latitude: 41.0124223, longitude: 28.9361883}}
          title={"İşletmem - 1"}
          description={"İşlet Ayrıntısı - 1"}
        />
        <Marker
          coordinate={{latitude: 41.0097272, longitude: 28.9805511}}
          title={"İşletmem - 2"}
          description={"İşlet Ayrıntısı - 2"}
        />
      </MapView>
      
      </ScrollView>
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
  imageView: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 64,
    padding: 5,
    borderColor: '#4287f5',
  },
  profileImage: {
    width: 124,
    height: 124,
  },
  buttonView: {
    backgroundColor: '#4287f5',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#ffffff'
  }
});
