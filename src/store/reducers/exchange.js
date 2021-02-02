import {
  currencyFrom,
  currencyTo,
  currencyAmount,
  currencyRate,
  currencyResult,
  isFetching,
  isResultFull,
  inputError,
} from "../constants/exchange";

const initialState = {
  currencyFrom: "",
  currencyTo: "",
  currencyAmount: "",
  currencyRate: "",
  currencyResult: "",
  isFetching: false,
  isResultFull: false,
  inputError: false,
};

export const exchange = (state = initialState, action) => {
  switch (action.type) {
    case currencyFrom:
      return {
        ...state,
        currencyFrom: action.payload,
      };

    case currencyTo:
      return {
        ...state,
        currencyTo: action.payload,
      };

    case currencyAmount:
      return {
        ...state,
        currencyAmount: action.payload,
      };

    case currencyRate:
      return {
        ...state,
        currencyRate: action.payload,
      };

    case currencyResult:
      return {
        ...state,
        currencyResult: action.payload,
      };

    case isResultFull:
      return {
        ...state,
        isResultFull: action.payload,
      };

    case inputError:
      return {
        ...state,
        inputError: action.payload,
      };

    case isFetching:
      return {
        ...state,
        isFetching: action.payload,
      };
    
    default:
      return state;
  }
};
