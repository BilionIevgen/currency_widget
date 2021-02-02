import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { exchange } from "./reducers/exchange";
import { rateNamesReducer } from "./reducers/rateNames";

export const store = createStore(
  combineReducers({ exchange, rateNamesReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
