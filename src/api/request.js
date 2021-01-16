import axios from "axios";
import { CURRENCY_URL } from "../constants/api";

export function fetchData(currencyFrom) {
  return new Promise((responseProm, reject) => {
    axios
      .get(`${CURRENCY_URL}latest?base=${currencyFrom}`)
      .then(function (response) {
        return responseProm(response.data);
      })
      .catch(reject);
  });
}

