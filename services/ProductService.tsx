import { IOrders } from "../models/IOrders"
import { IProduct } from "../models/IProduct"
import { config } from "./Config"

export const allProduct = async (start: string) => {
  const sendParams = {
    start: start
  }
  return await config.get<IProduct>('product.php', {params: sendParams })
}


export const addBasket = async (customerId:string, productId:string) => {
  const sendParams = {
    customerId: customerId,
    productId: productId,
    html: productId
  }
  return await config.get('orderForm.php', {params: sendParams})
}


export const orderList = async (customerId: string) => {
  const sendParams = {
    musterilerID: customerId,
    rnd: Math.random()
  }
  return await config.get<IOrders>('orderList.php', {params: sendParams})
}