import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import episodesReducer from "./episodes-reducer";

const reducers = combineReducers({
  episodes: episodesReducer
})

type ReducerType = typeof reducers
export type AppStateType = ReturnType<ReducerType>

type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertyTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store = store
export default store