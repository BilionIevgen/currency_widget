import axios from "axios";
import { ACCESS_KEY, CURRENCY_URL } from "./constants";

export const fetchData = async (currencyFrom) => {
  try {
    const params = {
      access_key: ACCESS_KEY,
      format: 1
   }
    const response = await axios.get(
      CURRENCY_URL,{params}
    );
    const resp = response.data.rates[currencyFrom]
    return resp;
  } catch (error) {
    console.error(error);
  }
};