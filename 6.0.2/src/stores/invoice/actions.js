import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {*} value - The value to set for the spinner.
 * @returns {{type: string, payload: {name: string, value: *}}} - The action object.
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value},
});

/**
 * Action creator for fetching initial invoice details.
 * @param {*} payload - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchInvoiceInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for fetching the next invoice number.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchNextInvoiceNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_INVOICE_NUMBER,
  payload,
});

/**
 * Action creator for fetching invoices.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchInvoices = (payload = {}) => ({
  type: types.FETCH_INVOICES,
  payload,
});

/**
 * Action creator for fetching a single invoice.
 * @param {string} id - The ID of the invoice to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export const fetchSingleInvoice = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_INVOICE,
  payload: {id, onSuccess},
});

/**
 * Action creator for adding an invoice.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const addInvoice = (payload = {}) => ({
  type: types.ADD_INVOICE,
  payload,
});

/**
 * Action creator for updating an invoice.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const updateInvoice = (payload = {}) => ({
  type: types.UPDATE_INVOICE,
  payload,
});

/**
 * Action creator for changing the status of an invoice.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const changeInvoiceStatus = (payload = {}) => ({
  type: types.CHANGE_INVOICE_STATUS,
  payload,
});

/**
 * Action creator for removing an invoice.
 * @param {string} id - The ID of the invoice to remove.
 * @param {*} navigation - The navigation object for routing.
 * @returns {{type: string, payload: {id: string, navigation: *}}} - The action object.
 */
export const removeInvoice = (id, navigation) => ({
  type: types.REMOVE_INVOICE,
  payload: {id, navigation},
});

/**
 * Action creator for adding an invoice item.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const addInvoiceItem = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM,
  payload,
});

/**
 * Action creator for setting invoice items.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const setInvoiceItems = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM_SUCCESS,
  payload,
});

/**
 * Action creator for removing an invoice item.
 * @param {*} payload - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const removeInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_INVOICE_ITEM,
  payload,
});

/**
 * Action creator for sending an invoice.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const sendInvoice = (payload = {}) => ({
  type: types.SEND_INVOICE,
  payload,
});
