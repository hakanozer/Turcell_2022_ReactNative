import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProBilgiler } from '../models/IProduct';
import { Bilgiler } from '../models/IUserLogin';

export const storeData = async (value: Bilgiler) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}


export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) as Bilgiler : null;
  } catch(e) {
    // error reading value
  }
}

export const deleteData = async () => {
  try {
    await AsyncStorage.removeItem('@storage_Key')
    return true;
  }catch(e) {
    // 
  }
  return false
}

// Likes Data
export const likesStoreData = async (value: ProBilgiler[]) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@likes_storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}


export const likesGetData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@likes_storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) as ProBilgiler[] : null;
  } catch(e) {
    // error reading value
  }
}

export const likesDeleteData = async () => {
  try {
    await AsyncStorage.removeItem('@likes_storage_Key')
    return true;
  }catch(e) {
    // 
  }
  return false
}



