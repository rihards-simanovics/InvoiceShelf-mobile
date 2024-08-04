import * as types from './types';

/**
 * Action creator for setting a spinner state.
 * @param {string} name - The name of the spinner.
 * @param {*} value - The value to set for the spinner.
 * @returns {{type: string, payload: {name: string, value: *}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching customers.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchCustomers(payload = {}) {
  return {
    type: types.FETCH_CUSTOMERS,
    payload,
  };
}

/**
 * Action creator for fetching a single customer.
 * @param {string} id - The ID of the customer to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export function fetchSingleCustomer(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CUSTOMER,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for fetching customer initial details.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchCustomerInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for adding a customer.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function addCustomer(payload = {}) {
  return {
    type: types.ADD_CUSTOMER,
    payload,
  };
}

/**
 * Action creator for updating a customer.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function updateCustomer(payload = {}) {
  return {
    type: types.UPDATE_CUSTOMER,
    payload,
  };
}

/**
 * Action creator for removing a customer.
 * @param {string} id - The ID of the customer to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export function removeCustomer(id) {
  return {
    type: types.REMOVE_CUSTOMER,
    payload: {id},
  };
}
