import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value},
});

/**
 * Action creator for fetching the next invoice date.
 * @param {Object} params - Parameters for the request.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {params: Object, onSuccess: function}}} - The action object.
 */
export const fetchNextInvoiceAt = ({params, onSuccess}) => ({
  type: types.FETCH_NEXT_INVOICE_AT,
  payload: {params, onSuccess},
});

/**
 * Action creator for fetching initial details of a recurring invoice.
 * @param {Object} payload - The payload containing initial details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchRecurringInvoiceInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for fetching recurring invoices.
 * @param {Object} payload - The payload containing request parameters.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchRecurringInvoices = (payload = {}) => ({
  type: types.FETCH_RECURRING_INVOICES,
  payload,
});

/**
 * Action creator for fetching a single recurring invoice.
 * @param {string} id - The ID of the recurring invoice.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export const fetchSingleRecurringInvoice = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_RECURRING_INVOICE,
  payload: {id, onSuccess},
});

/**
 * Action creator for adding a recurring invoice.
 * @param {Object} payload - The payload containing invoice details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addRecurringInvoice = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE,
  payload,
});

/**
 * Action creator for updating a recurring invoice.
 * @param {Object} payload - The payload containing updated invoice details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const updateRecurringInvoice = (payload = {}) => ({
  type: types.UPDATE_RECURRING_INVOICE,
  payload,
});

/**
 * Action creator for removing a recurring invoice.
 * @param {string} id - The ID of the recurring invoice to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export const removeRecurringInvoice = (id) => ({
  type: types.REMOVE_RECURRING_INVOICE,
  payload: {id},
});

/**
 * Action creator for adding an item to a recurring invoice.
 * @param {Object} payload - The payload containing item details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addRecurringInvoiceItem = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM,
  payload,
});

/**
 * Action creator for setting recurring invoice items.
 * @param {Object} payload - The payload containing item details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const setRecurringInvoiceItems = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
  payload,
});

/**
 * Action creator for removing an item from a recurring invoice.
 * @param {Object} payload - The payload containing item details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const removeRecurringInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_RECURRING_INVOICE_ITEM,
  payload,
});
