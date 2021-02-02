import { useEffect } from "react";
import "./currency.scss";
import CurrencyResult from "./components/CurrencyResult";
import CurrencyRate from "./components/CurrencyRate";
import {
  setFrom,
  setTo,
  setAmount,
  setResultFull,
  setInputError,
} from "./store/actions/exchange";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "./store/actions/thunks";

export default function App() {
  const dispatch = useDispatch();
  // getting data from store
  const {
    currencyFrom,
    currencyTo,
    currencyAmount,
    currencyRate,
    currencyResult,
    isFetching,
    isResultFull,
    inputError,
    currencyCashedRate,
  } = useSelector(
    (store) => {
      const{
        exchange: {
          currencyFrom,
          currencyTo,
          currencyAmount,
          currencyRate,
          currencyResult,
          isFetching,
          isResultFull,
          inputError,
          currencyCashedRate,
        }
      } = store
      return {
        currencyFrom,
        currencyTo,
        currencyAmount,
        currencyRate,
        currencyResult,
        isFetching,
        isResultFull,
        inputError,
        currencyCashedRate,
      };
    }
    );
  // getting data from server
  useEffect(() => {
    // checking if every field is filled
    const areInputsFull = currencyFrom && currencyTo && currencyAmount;
    if (
      !inputError &&
      areInputsFull &&
      currencyAmount[currencyAmount.length - 1] !== "."
    ) {
      dispatch(
        fetchCurrency(
          currencyFrom,
          currencyTo,
          currencyAmount,
          currencyCashedRate
        )
      );
    } else {
      dispatch(setResultFull(false));
    }
    // eslint-disable-next-line
  }, [isResultFull, currencyFrom, currencyTo, currencyAmount]);

  const onFromSelect = (val) => {
    dispatch(setFrom(val));
  };

  const onToSelect = (val) => {
    dispatch(setTo(val));
  };

  const onAmountInput = (val) => {
    // validation
    const newVal = val.target.value?.trim();
    if (isNaN(newVal)) {
      dispatch(setInputError(true));
      dispatch(setAmount(val.target.value));
    } else {
      dispatch(setInputError(false));
      if (newVal.length > 0 && newVal[newVal.length - 1] !== ".") {
        dispatch(setAmount(parseFloat(newVal)));
      } else {
        dispatch(setAmount(newVal));
      }
    }
  };

  return (
    <div className="currency">
      <div className="currency_wrapper">
        <h1>Currency Converter :</h1>
        <div className="currency_field">
          <CurrencyRate
            inputError={inputError}
            onFromSelect={onFromSelect}
            onToSelect={onToSelect}
            currencyAmount={currencyAmount}
            onAmountInput={onAmountInput}
          />
          {isResultFull && (
            <CurrencyResult
              currencyTo={currencyTo}
              currencyFrom={currencyFrom}
              currencyAmount={currencyAmount}
              isFetching={isFetching}
              currencyRate={currencyRate}
              currencyResult={currencyResult}
            />
          )}
        </div>
      </div>
    </div>
  );
}
