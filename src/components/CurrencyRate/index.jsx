import React from "react";
import { Input, Select } from "antd";
import { OPTIONS } from "../../constants/currency";
import PropTypes from 'prop-types';

const { Option } = Select;



export default function CurrencyRate({
  onFromSelect,
  onToSelect,
  currencyAmmount,
  onAmountInput,
  inputError,
}) {
  const optionsMapping = OPTIONS.map((item) => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ))
  return (
    <div className="currency_initial">
      <div className="rate rate_from">
        <span className="rate_span">From :</span>
        <Select onSelect={onFromSelect}>
          {optionsMapping}
        </Select>
      </div>

      <div className="rate rate_to">
        <span className="rate_span">To :</span>
        <Select onSelect={onToSelect}>
          {optionsMapping}
        </Select>
      </div>

      <div className="rate rate-ammount">
        <span className="rate_span">Amount :</span>
        <Input value={currencyAmmount} onChange={onAmountInput} />
        {inputError && <span className="input_error">Only numbers.</span>}
      </div>
    </div>
  );
}

CurrencyRate.propTypes = {
  onFromSelect: PropTypes.func,
  onToSelect: PropTypes.func,
  onAmountInput: PropTypes.func,
  inputError: PropTypes.bool,
}
