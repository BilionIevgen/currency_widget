import {
  currencyFrom,
  currencyTo,
  currencyAmmount,
  currencyRate,
  currencyResult,
  isFetching,
  isResultFull,
  inputError,
  cachedRate,
} from "../constants/exchange";
import { fetchData } from "../../api/request";

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

export const setAmmount = (payload) => {
  return {
    type: currencyAmmount,
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

export const setCachedRate = (payload) => {
  return {
    type: cachedRate,
    payload,
  };
};

// thunk-creators

// getting data
export const fetchCurrency = (
  currencyFrom,
  currencyTo,
  currencyAmmount,
  currencyCashedRate
) => async (dispatch) => {
  // showing result field:
  dispatch(setResultFull(true));

  // cleaning states:
  dispatch(setRate(""));
  dispatch(setResult(""));

  // if no cashe and cahed currency is not equal to  RFOM and TO currency or if equal but time of cash is more than 10sec then sending request
  if (
   ( currencyCashedRate?.currency.from !== currencyFrom ||
    currencyCashedRate?.currency.to !== currencyTo) || ( currencyCashedRate?.currency.from === currencyFrom &&
        currencyCashedRate?.currency.to === currencyTo && ( ( Date.now() - currencyCashedRate?.date ) >= 10000))
  ) {
    // showing preloader:
    dispatch(setIsFetching(true));
    // request data from server
    const response = await fetchData(currencyFrom);

    // checking if currency from and to are equal
    const rate =
      currencyFrom === currencyTo ? 1 : +response.rates[currencyTo].toFixed(2);

    //setting result state
    dispatch(setRate(rate));

    //setting cashed result
    dispatch(
      setCachedRate({
        currency: {
          from: currencyFrom,
          to: currencyTo,
        },
          rate: rate,
        date: Date.now()
      })
    );
    dispatch(
      setResult(
        new Intl.NumberFormat().format((rate * currencyAmmount).toFixed(2)) +
          ` ${currencyTo}`
      )
    );
    // imitating bad internet
    setTimeout(() => {
      dispatch(setIsFetching(false));
    }, 1000);

  }

  //   if curency value is cahed then we are getting rate data from cash
  else if (
    currencyCashedRate?.currency.from === currencyFrom ||
    currencyCashedRate?.currency.to === currencyTo
  ) {
    //setting result state
    dispatch(setRate(currencyCashedRate?.rate));
    dispatch(
      setResult(
        new Intl.NumberFormat().format(
          (currencyCashedRate?.rate * currencyAmmount).toFixed(2)
        ) + ` ${currencyTo}`
      )
    );
  }
};
