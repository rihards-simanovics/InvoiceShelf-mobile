import * as types from './types';

/**
 * Action creator for toggling a spinner.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value to set the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator to fetch taxes.
 * @param {Object} payload - The payload for fetching taxes.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchTaxes(payload = {}) {
  return {
    type: types.FETCH_TAXES,
    payload,
  };
}

/**
 * Action creator to fetch a single tax by ID.
 * @param {string} id - The ID of the tax to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export function fetchSingleTax(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_TAX,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator to add a new tax.
 * @param {Object} payload - The payload containing tax details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function addTax(payload = {}) {
  return {
    type: types.ADD_TAX,
    payload,
  };
}

/**
 * Action creator to update an existing tax.
 * @param {Object} payload - The payload containing updated tax details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function updateTax(payload = {}) {
  return {
    type: types.UPDATE_TAX,
    payload,
  };
}

/**
 * Action creator to remove a tax by ID.
 * @param {string} id - The ID of the tax to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export function removeTax(id) {
  return {
    type: types.REMOVE_TAX,
    payload: {id},
  };
}
