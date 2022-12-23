import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Provider} from 'react-redux'
import { store } from './useRedux/Store';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// import pages
import Login from './pages/Login'
import Register from './pages/Register'
// login stack
const LoginStack = () => 
<Stack.Navigator>
  <Stack.Screen name='Login' component={Login} options={{ header: ()=> null }} />
  <Stack.Screen name='Register' component={Register} options={{ header: ()=> null }}  />
</Stack.Navigator>


// Bottom Tab Screen
import TabProduct from './pages/TabProduct'
import ProductDetail from './pages/ProductDetail'
import Order from './pages/Order'
const ProductStack = () =>
<Stack.Navigator>
  <Stack.Screen name='Product' component={TabProduct} options={{ header: ()=> null }} />
  <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ header: ()=> null }} />
  <Stack.Screen name='Order' component={Order} options={{ header: ()=> null }} />
</Stack.Navigator>


// Tab Likes
import Likes from './pages/Likes'
const LikesStack = () =>
<Stack.Navigator>
  <Stack.Screen name='Likes' component={Likes} options={{ header: ()=> null }} />
  <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ header: ()=> null }} />
</Stack.Navigator>


import TabProfile from './pages/TabProfile'
import { likesGetData } from './utils/AsyncStore';
import { ILikeAction } from './useRedux/LikesReducer';
import { LikesEnum } from './useRedux/LikesEnum';
const AppTab = () => 
<Tab.Navigator
  initialRouteName='TabProduct'
  activeColor="#ffffff"
  inactiveColor="#000000"
  barStyle={{ backgroundColor: '#4287f5', height: 100, paddingBottom: 48 }}
>
  <Tab.Screen 
    name='Products' 
    component={ProductStack}
    options= {{
      tabBarIcon: ({color, size}: any ) => (
        <SimpleLineIcons name='basket' color={color} size={25} />
      )
    }}
  />
  <Tab.Screen 
    name='Likes' 
    component={LikesStack}
    options= {{
      tabBarIcon: ({color, size}: any ) => (
        <SimpleLineIcons name='heart' color={color} size={25} />
      )
    }}
  />
  <Tab.Screen 
    name='Profile' 
    component={TabProfile} 
        options= {{
      tabBarIcon: ({color, size}: any ) => (
        <SimpleLineIcons name='user' color={color} size={25} />
      )
    }}
  />
</Tab.Navigator>


export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginStack" component={LoginStack} options={{ header: ()=> null }} />
          <Stack.Screen name="AppTab" component={AppTab} options={{ header: ()=> null }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
});


