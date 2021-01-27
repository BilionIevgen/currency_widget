import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { exchange } from "./reducers/exchange";

export const store = createStore(
  combineReducers({ exchange }),
  composeWithDevTools(applyMiddleware(thunk))
);
