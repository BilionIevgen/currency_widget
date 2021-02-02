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

export const setFrom = (payload) => {
  return {
    type: currencyFrom,
    payload,
  };
};

export const setTo = (payload) => {
  return {
    type: currencyTo,
    payload,
  };
};

export const setAmount = (payload) => {
  return {
    type: currencyAmount,
    payload,
  };
};

export const setRate = (payload) => {
  return {
    type: currencyRate,
    payload,
  };
};

export const setResult = (payload) => {
  return {
    type: currencyResult,
    payload,
  };
};

export const setIsFetching = (payload) => {
  return {
    type: isFetching,
    payload,
  };
};

export const setResultFull = (payload) => {
  return {
    type: isResultFull,
    payload,
  };
};

export const setInputError = (payload) => {
  return {
    type: inputError,
    payload,
  };
};




