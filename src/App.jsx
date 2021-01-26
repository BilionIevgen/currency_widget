import { useEffect } from "react";
import "./currency.scss";
import CurrencyResult from "./components/CurrencyResult";
import CurrencyRate from "./components/CurrencyRate";
import {
  setFrom,
  setTo,
  setAmmount,
  setResultFull,
  setInputError,
  fetchCurrency,
} from "./store/actions/exchange";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
 // getting data from store 
  const {
    currencyFrom,
    currencyTo,
    currencyAmmount,
    currencyRate,
    currencyResult,
    isFetching,
    isResultFull,
    inputError,
    currencyCashedRate
  } = useSelector(
    ({
      exchange: {
        currencyFrom,
        currencyTo,
        currencyAmmount,
        currencyRate,
        currencyResult,
        isFetching,
        isResultFull,
        inputError,
        currencyCashedRate
      },
    }) => {
      return {
        currencyFrom,
        currencyTo,
        currencyAmmount,
        currencyRate,
        currencyResult,
        isFetching,
        isResultFull,
        inputError,
        currencyCashedRate
      };
    }
  );
  // getting data from server
  useEffect(() => {
    // checking if every field is filled
    const areInputsFull = currencyFrom && currencyTo && currencyAmmount;
    if (
      !inputError &&
      areInputsFull &&
      currencyAmmount[currencyAmmount.length - 1] !== "."
    ) {
      dispatch(fetchCurrency(currencyFrom, currencyTo, currencyAmmount,currencyCashedRate));
    } else {
      dispatch(setResultFull(false));
    }
    // eslint-disable-next-line
  }, [isResultFull, currencyFrom, currencyTo, currencyAmmount]);

  const onFromSelect = (val) => {
    dispatch(setFrom(val));
  };

  const onToSelect = (val) => {
    dispatch(setTo(val));
  };

  const onAmountInput = (val) => {
    // validation
    const newVal = val.target.value.trim();
    if (isNaN(newVal)) {
      dispatch(setInputError(true));
      dispatch(setAmmount(val.target.value));
    } else {
      dispatch(setInputError(false));
      if (newVal.length > 0 && newVal[newVal.length - 1] !== ".") {
        dispatch(setAmmount(parseFloat(newVal)));
      } else {
        dispatch(setAmmount(newVal));
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
            currencyAmmount={currencyAmmount}
            onAmountInput={onAmountInput}
          />
          {isResultFull && (
            <CurrencyResult
              currencyTo={currencyTo}
              currencyFrom={currencyFrom}
              currencyAmmount={currencyAmmount}
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

export default App;
