import * as user from './user/reducer'

import {createStore, combineReducers, applyMiddleware, compose} from "redux";

import thunkMiddleware from "redux-thunk";

let store = createStore(
  combineReducers({...user}),
  applyMiddleware(thunkMiddleware)
);

export default store;