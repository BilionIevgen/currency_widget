import { useEffect, useState } from "react";
import "./currency.scss";
import _ from "lodash";
import axios from "axios";
import CurrencyResult from "./components/CurrencyResult";
import CurrencyRate from "./components/CurrencyRate";

function App() {
  const [currencyFrom, setFrom] = useState("");
  const [currencyTo, setTo] = useState("");
  const [currencyAmmount, setAmmount] = useState("");
  const [currencyRate, setRate] = useState("");
  const [currencyResult, setResult] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isResultFull, setResultFull] = useState(false);
  const [inputError, setInputError] = useState(false);

  // request data from server
  useEffect(() => {
    if (!inputError && currencyFrom && currencyTo && currencyAmmount) {
      setIsFetching(true);
      setResultFull(currencyFrom && currencyTo && currencyAmmount);
      setRate("");
      setResult("");
      // imitating bad internet
      fetchData();
    } else {
      setResultFull(false);
    }
  }, [isResultFull, currencyFrom, currencyTo, currencyAmmount]);

  function fetchData() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${currencyFrom}`)
      .then(function (response) {
        // handle success
        setTimeout(() => {
          setIsFetching(false);
        }, 1000);
        const rate = +response.data.rates[currencyTo].toFixed(8);
        setRate(rate);
        setResult(
          (+response.data.rates[currencyTo] * currencyAmmount).toFixed(6) +
            ` ${currencyTo}`
        );
        
         
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  const onFromSelect = (val) => {
    setFrom(() => val);
  };

  const onToSelect = (val) => {
    setTo(val);
  };

  const onAmountInput = (val) => {
    val = val.target.value.trim();
    var reg = new RegExp('^[1-9]*$');
    if (val && !reg.test(val)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setAmmount(val);
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
