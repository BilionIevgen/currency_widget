import {
  EUR_EUR,
  EUR_ILS,
  ILS_ILS,
  ILS_USD,
  USD_EUR,
  USD_USD,
} from "../../constants/currency";

export const setEUR_EUR = (payload) => {
  return {
    type: EUR_EUR,
    payload,
  };
};
export const setEUR_ILS = (payload) => {
  return {
    type: EUR_ILS,
    payload,
  };
};
export const setILS_ILS = (payload) => {
  return {
    type: ILS_ILS,
    payload,
  };
};
export const setILS_USD = (payload) => {
  return {
    type: ILS_USD,
    payload,
  };
};
export const setUSD_EUR = (payload) => {
  return {
    type: USD_EUR,
    payload,
  };
};
export const setUSD_USD = (payload) => {
  return {
    type: USD_USD,
    payload,
  };
};

