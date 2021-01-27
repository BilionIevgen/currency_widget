import { fetchData } from "../../api/request";
import {
  setIsFetching,
  setRate,
  setResult,
  setResultFull,
  setCachedRate,
} from "./exchange";

// getting data
export const fetchCurrency = (
  currencyFrom,
  currencyTo,
  currencyAmount,
  currencyCashedRate
) => async (dispatch) => {
  // showing result field:
  dispatch(setResultFull(true));

  dispatch(setRate(""));
  dispatch(setResult(""));

  // if no cache and cached currency is not equal to  FROM and TO currency or if equal but time of cache is more then 10sec then sending request
  const isSendingRequest =
    currencyCashedRate?.currency?.from !== currencyFrom ||
    currencyCashedRate?.currency?.to !== currencyTo ||
    (currencyCashedRate?.currency?.from === currencyFrom &&
      currencyCashedRate?.currency?.to === currencyTo &&
      Date.now() - currencyCashedRate?.date >= 10000);
  if (isSendingRequest) {
    // showing preloader:
    dispatch(setIsFetching(true));
    // request data from server
    const response = await fetchData(currencyFrom);
    // checking if currency from and to are equal
    const rate =
      currencyFrom === currencyTo
        ? 1
        : +response?.rates[currencyTo]?.toFixed(2);
    dispatch(setRate(rate));
    dispatch(
      setCachedRate({
        currency: {
          from: currencyFrom,
          to: currencyTo,
        },
        rate: rate,
        date: Date.now(),
      })
    );
    dispatch(
      setResult(
        new Intl.NumberFormat().format((rate * currencyAmount)?.toFixed(2)) +
          ` ${currencyTo}`
      )
    );
    dispatch(setIsFetching(false));
  }

  //   if curency value is cahed then we are getting rate data from cash
  else if (
    currencyCashedRate?.currency?.from === currencyFrom ||
    currencyCashedRate?.currency?.to === currencyTo
  ) {
    //setting result state
    dispatch(setRate(currencyCashedRate?.rate));
    dispatch(
      setResult(
        new Intl.NumberFormat().format(
          (currencyCashedRate?.rate * currencyAmount).toFixed(2)
        ) + ` ${currencyTo}`
      )
    );
  }
};
