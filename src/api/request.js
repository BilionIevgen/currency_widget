import axios from "axios";
import { CURRENCY_URL } from "../constants/api";

export function  fetchData(currencyFrom) {
  return axios
    .get(`${CURRENCY_URL}latest?base=${currencyFrom}`)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
