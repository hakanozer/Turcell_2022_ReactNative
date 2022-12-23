import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import {StackActions} from '@react-navigation/native';
import axios from 'axios'
import { IUserLogin } from '../models/IUserLogin';
import { getData, likesDeleteData, likesGetData, storeData } from '../utils/AsyncStore';
import { ILikeAction } from '../useRedux/LikesReducer';
import { LikesEnum } from '../useRedux/LikesEnum';
import { useDispatch } from 'react-redux'

export default function Login( { navigation }: any ) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const fncSend = () => {
    
    if ( email === '' || password === '' ) {
        Alert.alert('Empty Error', 'All input Empty!')
    }else {

        const url = 'https://www.jsonbulut.com/json/userLogin.php'
        const sendParams = {
          ref: 'd1becef32825e5c8b0fc1b096230400b',
          userEmail: email,
          userPass: password,
          face: 'no'
        }
        axios.get<IUserLogin>(url, {params: sendParams})
        .then(res => {
            const user = res.data.user[0]
            if (user.durum && user.bilgiler) {
              storeData( user.bilgiler ).then(() => {
                navigation.dispatch(
                  StackActions.replace('AppTab')
                );
              })
            }else {
              Alert.alert('Login', user.mesaj)
            }
        })

    }

  }

  const dispatch = useDispatch()

  useEffect( ()=> {

      //likesDeleteData()-
      const sendItem: ILikeAction = {
          type: LikesEnum.LIKE_CLEAR,
          payload: null
      }
      dispatch(sendItem)

      likesGetData().then(arr => {

        if (arr) {
          arr.forEach(item => {
            const sendItem: ILikeAction = {
                type: LikesEnum.LIKE_ADD,
                payload: item
            }
            dispatch(sendItem)
          })
        }

      getData().then(user => {
        if (user) {
            navigation.dispatch(
              StackActions.replace('AppTab')
            );
        }
      })

      })

  }, [])


  useEffect( () => {
    if (email !== '') {
      console.log("email", email) 
    }
  }, [email] )
  
  return (
    <View style={styles.container}>
        <Text style={styles.txtTitle}>User Login</Text>

        <TextInput onChangeText={(txt) => setEmail(txt) } autoCapitalize='none' keyboardType='email-address' placeholder='E-Mail' style={styles.txtInput} />

        <TextInput onChangeText={(txt) => setPassword(txt) } secureTextEntry autoCapitalize='none' placeholder='Password' style={styles.txtInput} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={fncSend}>
            <View style={styles.btnView}>
              <Text style={styles.btnText}>Send</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
            <View style={styles.btnView}>
              <Text style={styles.btnText}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ffffff'
  },
  txtTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#4287f5',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#4287f5',
    borderRadius: 5,
    padding: 5,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  btnView: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
  }
});


