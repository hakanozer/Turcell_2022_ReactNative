import { ProBilgiler } from "../models/IProduct";
import { LikesEnum } from "../useRedux/LikesEnum";
import { likesDeleteData, likesStoreData } from "../utils/AsyncStore";

export interface ILikeAction {
  type: LikesEnum,
  payload: ProBilgiler | null
}


export const LikesReducer = ( state: ProBilgiler[] = [], action: ILikeAction ) => {
  switch(action.type) {

    case LikesEnum.LIKE_ADD:
      //state.push(action.payload)
      //sreturn state;
      const newArrAdd = [...state, action.payload];
      likesStoreData(newArrAdd)
    return newArrAdd

    case LikesEnum.LIKE_REMOVE:
      const index = state.findIndex( (item) => item.productId === action.payload.productId )
      const newArr = Object.assign([], state)
      newArr.splice(index, 1)
      likesStoreData(newArr)
    return newArr;

    case LikesEnum.LIKE_CLEAR:
    return []

    case LikesEnum.LIKE_LIST:
    return state;

    default:
    return state;
  }
}