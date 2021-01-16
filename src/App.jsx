import { useEffect, useState } from "react";
import "./currency.scss";
import CurrencyResult from "./components/CurrencyResult";
import CurrencyRate from "./components/CurrencyRate";
import { fetchData } from "./api/request";

function App() {
  const [currencyFrom, setFrom] = useState("");
  const [currencyTo, setTo] = useState("");
  const [currencyAmmount, setAmmount] = useState("");
  const [currencyRate, setRate] = useState("");
  const [currencyResult, setResult] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isResultFull, setResultFull] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(async () => {
    const areInputsFull = currencyFrom && currencyTo && currencyAmmount
    if (
      !inputError &&
      areInputsFull &&
      currencyAmmount[currencyAmmount.length - 1] !== "."
    ) {
      // showing preloader:
      setIsFetching(true);

      // showing result field:
      setResultFull(areInputsFull);
      
      // cleaning states:
      setRate("");
      setResult("");

      // request data from server
      const response = await fetchData(currencyFrom);

      // imitating bad internet
      setTimeout(() => {
        setIsFetching(false);
      }, 1000);

      // checking if currency from and to are equal
      const rate = currencyFrom == currencyTo ? 1 : +response.rates[currencyTo].toFixed(2);
      
      //setting result state
      setRate(rate);
      setResult(
        new Intl.NumberFormat().format(
          (rate * currencyAmmount).toFixed(2)
        ) + ` ${currencyTo}`
      );
    } else {
      setResultFull(false);
    }
    // eslint-disable-next-line
  }, [isResultFull, currencyFrom, currencyTo, currencyAmmount]);

  const onFromSelect = (val) => {
    setFrom(() => val);
  };

  const onToSelect = (val) => {
    setTo(val);
  };

  const onAmountInput = (val) => {
    const newVal = val.target.value.trim();
    if (isNaN(newVal)) {
      setInputError(true);
      setAmmount(val.target.value);
    } else {
      setInputError(false);
      if (newVal.length > 0 && newVal[newVal.length - 1] !== ".") {
        setAmmount(parseFloat(newVal));
      } else {
        setAmmount(newVal);
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
