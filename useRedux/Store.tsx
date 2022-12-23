import { combineReducers, createStore } from 'redux'
import { LikesReducer } from './LikesReducer'

const combine = combineReducers({
  LikesReducer
})

export type StateType =  ReturnType<typeof combine>

export const store = createStore(combine)
