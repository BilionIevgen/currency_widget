import axios from "axios";

export const fetchData = async (currencyFrom) => {
  try {
  //   const params = {
  //     access_key: ACCESS_KEY,
  //     format: 1
  //  }
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=d7be9d01b04e9c91d1500e9172f24af7&format=1`
    );
    console.log('currencyFrom',currencyFrom);
    const resp = response.data.rates[currencyFrom]
    console.log('resp', resp);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
