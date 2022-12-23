import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import { IUserRegister } from '../models/IUserRegister';

export default function Register( { navigation }: any ) {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const fncSend = () => {
    console.log("fnc Log")
   if ( email === '' || password === '' ) {
        Alert.alert('Empty Error', 'All input Empty!')
    }else {
        const url = 'https://www.jsonbulut.com/json/userRegister.php'
        const sendParams = {
          ref: 'd1becef32825e5c8b0fc1b096230400b',
          userName: name,
          userSurname: surname,
          userPhone: phone,
          userMail: email,
          userPass: password
        }
        axios.get<IUserRegister>(url, {params: sendParams}).then( res => {
          const status = res.data.user[0].durum
          const message = res.data.user[0].mesaj
          if (status) {
              navigation.navigate('Login')
          }else {
            Alert.alert('Register', message);
          }
        }).catch(err => {
          console.log(err)
        })

    }
  }
  
  return (
    <View style={styles.container}>
        <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} onPress={ () => navigation.goBack() }>
          <AntDesign name='left' size={25} color='#4287f5' />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>User Register</Text>

        <TextInput onChangeText={(txt) => setName(txt) } placeholder='Name' style={styles.txtInput} />

        <TextInput onChangeText={(txt) => setSurname(txt) } placeholder='Surname' style={styles.txtInput} />

        <TextInput onChangeText={(txt) => setPhone(txt) } keyboardType='phone-pad' placeholder='Phone' style={styles.txtInput} />

        <TextInput onChangeText={(txt) => setEmail(txt) } autoCapitalize='none' keyboardType='email-address' placeholder='E-Mail' style={styles.txtInput} />

        <TextInput onChangeText={(txt) => setPassword(txt) } secureTextEntry autoCapitalize='none' placeholder='Password' style={styles.txtInput} />

        <TouchableOpacity disabled={false} onPress={fncSend}>
          <View style={styles.btnView}>
            <Text style={styles.btnText}>Send</Text>
          </View>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ffffff',
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


