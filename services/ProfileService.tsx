import { config } from "./Config"


export const userUpdate = async ( 
  userID: string, 
  name:string, 
  surname: string, 
  phone: string, 
  email: string, 
  password: string) => 

{
  const sendParams = {
    userName: name,
    userSurname: surname,
    userMail: email,
    userPhone: phone,
    userPass: password,
    userId: userID
  }
  const url = 'userSettings.php'
  return await config.get(url, {params: sendParams})
}