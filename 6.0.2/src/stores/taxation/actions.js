import * as types from './types';

/**
 * Creates an action to set the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Creates an action to fetch the sales tax rate.
 * @param {Object} payload - The payload containing necessary data for fetching the sales tax rate.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchSalesTaxRate(payload = {}) {
  return {
    type: types.FETCH_SALES_TAX_RATE,
    payload,
  };
}
