import { fetchData } from "../../api/request";
import rateNamesGenerators from "../../helper/rateNamesGenerators";
import { setIsFetching, setRate, setResult, setResultFull } from "./exchange";

import {
  setEUR_EUR,
  setEUR_ILS,
  setILS_ILS,
  setILS_USD,
  setUSD_EUR,
  setUSD_USD,
} from "./rateNames";

// getting data
export const fetchCurrency = (
  currencyFrom,
  currencyTo,
  currencyAmount
) => async (dispatch, store) => {
  const rateNamesReducer = store()?.rateNamesReducer
  // showing result field:
  dispatch(setResultFull(true));
  dispatch(setRate(""));
  dispatch(setResult(""));
  const currentRateName = rateNamesGenerators(currencyFrom, currencyTo);
  
  const dispatchRate = ( rate) => {
    if (currentRateName === "EUR_EUR") {
      dispatch(
        setEUR_EUR({
          time: Date.now(),
          rate: rate,
        })
      );
    }
    if (currentRateName === "EUR_ILS") {
      dispatch(
        setEUR_ILS({
          time: Date.now(),
          rate: rate,
        })
      );
    }
    if (currentRateName === "ILS_ILS") {
      dispatch(
        setILS_ILS({
          time: Date.now(),
          rate: rate,
        })
      );
    }
    if (currentRateName === "ILS_USD") {
      dispatch(
        setILS_USD({
          time: Date.now(),
          rate: rate,
        })
      );
    }
    if (currentRateName === "USD_EUR") {
      dispatch(
        setUSD_EUR({
          time: Date.now(),
          rate: rate,
        })
      );
    }
    if (currentRateName === "USD_USD") {
      dispatch(
        setUSD_USD({
          time: Date.now(),
          rate: rate,
        })
      );
    }
  };

  // checking cache
  
  if (
    rateNamesReducer?.[currentRateName]?.time &&
    Date.now() - rateNamesReducer?.[currentRateName]?.time < 10000
  ) {
    //setting result state
    dispatch(setRate(rateNamesReducer?.[currentRateName]?.rate));
    dispatch(
      setResult(
        new Intl.NumberFormat().format(
          (rateNamesReducer?.[currentRateName]?.rate * currencyAmount)?.toFixed(
            2
          )
        ) + ` ${currencyTo}`
      )
    );
    dispatchRate(rateNamesReducer?.[currentRateName]?.rate);
  } else {
    // showing preloader:
    dispatch(setIsFetching(true));
    // request data from server
    const dataRate = await fetchData(currencyFrom);
    // checking if currency from and to are equal
    const rate =
      currencyFrom === currencyTo
        ? 1
        : +dataRate?.toFixed(2);
    dispatch(setRate(rate));
    dispatch(
      setResult(
        new Intl.NumberFormat().format((rate * currencyAmount)?.toFixed(2)) +
          ` ${currencyTo}`
      )
    );
    dispatch(setIsFetching(false));
    dispatchRate(rate);
  }
};
