import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {*} value - The value to set for the spinner.
 * @returns {{type: string, payload: {name: string, value: *}}} The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching the payment modes list.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const fetchPaymentModes = (payload = {}) => ({
  type: types.FETCH_PAYMENT_MODES,
  payload,
});

/**
 * Action creator for adding a payment mode.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const addPaymentMode = (payload = {}) => ({
  type: types.ADD_PAYMENT_MODE,
  payload,
});

/**
 * Action creator for updating a payment mode.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const updatePaymentMode = (payload = {}) => ({
  type: types.UPDATE_PAYMENT_MODE,
  payload,
});

/**
 * Action creator for removing a payment mode.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const removePaymentMode = (payload = {}) => ({
  type: types.REMOVE_PAYMENT_MODE,
  payload,
});
