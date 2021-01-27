import axios from "axios";
import { CURRENCY_URL } from "./constants";

export const fetchData = async(currencyFrom) => {
  try {
    const response = await axios
      .get(`${CURRENCY_URL}latest?base=${currencyFrom}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
  
}

