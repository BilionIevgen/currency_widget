import {
  EUR,
  ILS,
  USD,
  USD_USD,
  ILS_ILS,
  EUR_EUR,
  USD_EUR,
  EUR_ILS,
  ILS_USD,
} from "../constants/currency";

export default (from, to) => {
  if (from === USD) {
    if (to === USD) {
      return USD_USD;
    }
    if (to === EUR) {
      return USD_EUR;
    }
    if (to === ILS) {
      return ILS_USD;
    }
  }
  if (from === EUR) {
    if (to === USD) {
      return USD_EUR;
    }
    if (to === EUR) {
      return EUR_EUR;
    }
    if (to === ILS) {
      return EUR_ILS;
    }
  }
  if (from === ILS) {
    if (to === USD) {
      return ILS_USD;
    }
    if (to === EUR) {
      return EUR_ILS;
    }
    if (to === ILS) {
      return ILS_ILS;
    }
  }
};
