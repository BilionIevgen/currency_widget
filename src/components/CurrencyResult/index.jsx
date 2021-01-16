import React from "react";
import { Spin } from "antd";
import PropTypes from 'prop-types';

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
              <span className="rate_span "> 1 {currencyFrom} = {currencyRate ? currencyRate : 1} {currencyTo}</span>
          </div>
          <div className="result_amount rate">
            <h2>Result :</h2>
            <span className="rate_span ">
                {new Intl.NumberFormat().format(currencyAmmount)} {currencyFrom} =
              {' '}
              {!currencyResult ? `${currencyAmmount} ${currencyTo}` : currencyResult}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

CurrencyResult.propTypes = {
  isFetching: PropTypes.bool,
  currencyRate: PropTypes.number,
  currencyResult: PropTypes.number,
  currencyFrom: PropTypes.string,
  currencyAmmount: PropTypes.number,
  currencyTo: PropTypes.string,
}
