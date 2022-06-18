import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import episodesReducer from "./episodes-reducer";

const reducers = combineReducers({
  episodes: episodesReducer
})

type ReducerType = typeof reducers
export type AppStateType = ReturnType<ReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store = store
export default store