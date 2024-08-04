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
 * Action creator for fetching payments.
 * @param {Object} payload - The payload for fetching payments.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchPayments(payload = {}) {
  return {
    type: types.FETCH_PAYMENTS,
    payload,
  };
}

/**
 * Action creator for fetching the next payment number.
 * @param {Object} payload - The payload for fetching the next payment number.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const fetchNextPaymentNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_PAYMENT_NUMBER,
  payload,
});

/**
 * Action creator for fetching a single payment.
 * @param {string} id - The ID of the payment to fetch.
 * @param {Function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: Function}}} The action object.
 */
export function fetchSinglePayment(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_PAYMENT,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for fetching initial payment details.
 * @param {Object} payload - The payload for fetching initial payment details.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const fetchPaymentInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for adding a payment.
 * @param {Object} payload - The payload for adding a payment.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function addPayment(payload = {}) {
  return {
    type: types.ADD_PAYMENT,
    payload,
  };
}

/**
 * Action creator for updating a payment.
 * @param {Object} payload - The payload for updating a payment.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function updatePayment(payload = {}) {
  return {
    type: types.UPDATE_PAYMENT,
    payload,
  };
}

/**
 * Action creator for removing a payment.
 * @param {string} id - The ID of the payment to remove.
 * @returns {{type: string, payload: {id: string}}} The action object.
 */
export function removePayment(id) {
  return {
    type: types.REMOVE_PAYMENT,
    payload: {id},
  };
}

/**
 * Action creator for sending a payment receipt.
 * @param {Object} payload - The payload for sending a payment receipt.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function sendPaymentReceipt(payload = {}) {
  return {
    type: types.SEND_PAYMENT_RECEIPT,
    payload,
  };
}

/**
 * Action creator for fetching payment invoices.
 * @param {Object} payload - The payload for fetching payment invoices.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchPaymentInvoices(payload = {}) {
  return {
    type: types.FETCH_PAYMENT_INVOICES,
    payload,
  };
}
