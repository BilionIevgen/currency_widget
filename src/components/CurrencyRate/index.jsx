import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;



export default function CurrencyRate({
  onFromSelect,
  onToSelect,
  currencyAmmount,
  onAmountInput,
  inputError,
}) {
    const option = ["USD", "EUR", "ILS"];
  return (
    <div className="currency_initial">
      <div className="rate rate_from">
        <span className="rate_span">From :</span>
        <Select onSelect={onFromSelect}>
          {option.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div className="rate rate_to">
        <span className="rate_span">To :</span>
        <Select onSelect={onToSelect}>
          {option.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div className="rate rate-ammount">
        <span className="rate_span">Amount :</span>
        <Input value={currencyAmmount} onChange={onAmountInput} />
        {inputError && <span className="input_error">please type numbers from 1</span>}
      </div>
    </div>
  );
}
