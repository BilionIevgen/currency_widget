import { EUR_EUR, EUR_ILS, ILS_ILS, ILS_USD, USD_EUR, USD_USD } from "../../constants/currency";

const initialState = {
  USD_USD: {
    time: "",
    rate: "",
  },
  ILS_ILS: {
    time: "",
    rate: "",
  },
  EUR_EUR: {
    time: "",
    rate: "",
  },
  USD_EUR: {
    time: "",
    rate: "",
  },
  EUR_ILS: {
    time: "",
    rate: "",
  },
  ILS_USD: {
    time: "",
    rate: "",
  },
};

export const rateNamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case USD_USD:
            return {
                ...state,
                USD_USD: action.payload
            }
        case ILS_ILS:
            return {
                ...state,
                ILS_ILS: action.payload
            }
        case EUR_EUR:
            return {
                ...state,
                EUR_EUR: action.payload
            }
        case USD_EUR:
            return {
                ...state,
                USD_EUR: action.payload
            }
        case EUR_ILS:
            return {
                ...state,
                EUR_ILS: action.payload
            }
        case ILS_USD:
            return {
                ...state,
                ILS_USD: action.payload
            }
            
    
        default:
           return state;
    }
}
