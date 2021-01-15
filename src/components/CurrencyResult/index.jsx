import React from "react";
import { Spin } from "antd";

export default function CurrencyResult({
  isFetching,
  currencyRate,
  currencyResult,
  currencyFrom,
  currencyAmmount,
  currencyTo,
}) {
  return (
    <div className="currency_result">
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="result_rate rate">
            <h2>Rate :</h2>
            <span className="rate_span ">{currencyRate ? currencyRate  : 1}</span>
          </div>
          <div className="result_amount rate">
            <h2>Result :</h2>
            <span className="rate_span ">
              {currencyAmmount} {currencyFrom} ={" "}
              {!currencyResult ? `${currencyAmmount} ${currencyTo}` : currencyResult}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

