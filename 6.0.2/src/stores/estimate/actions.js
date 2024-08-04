import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true for active, false for inactive).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value},
});

/**
 * Action creator for fetching initial estimate details.
 * @param {Object} payload - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchEstimateInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for fetching the next estimate number.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchNextEstimateNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_ESTIMATE_NUMBER,
  payload,
});

/**
 * Action creator for fetching estimates.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchEstimates = (payload = {}) => ({
  type: types.FETCH_ESTIMATES,
  payload,
});

/**
 * Action creator for fetching a single estimate.
 * @param {string} id - The ID of the estimate to fetch.
 * @param {function} onSuccess - Callback function to execute on successful fetch.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export const fetchSingleEstimate = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_ESTIMATE,
  payload: {id, onSuccess},
});

/**
 * Action creator for adding a new estimate.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addEstimate = (payload = {}) => ({
  type: types.ADD_ESTIMATE,
  payload,
});

/**
 * Action creator for updating an existing estimate.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const updateEstimate = (payload = {}) => ({
  type: types.UPDATE_ESTIMATE,
  payload,
});

/**
 * Action creator for removing an estimate.
 * @param {string} id - The ID of the estimate to remove.
 * @param {Object} navigation - The navigation object for navigating after removal.
 * @returns {{type: string, payload: {id: string, navigation: Object}}} - The action object.
 */
export const removeEstimate = (id, navigation) => ({
  type: types.REMOVE_ESTIMATE,
  payload: {id, navigation},
});

/**
 * Action creator for adding an estimate item.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addEstimateItem = (payload = {}) => ({
  type: types.ADD_ESTIMATE_ITEM,
  payload,
});

/**
 * Action creator for setting estimate items.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const setEstimateItems = (payload = {}) => ({
  type: types.ADD_ESTIMATE_ITEM_SUCCESS,
  payload,
});

/**
 * Action creator for removing an estimate item.
 * @param {Object} payload - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const removeEstimateItem = (payload = {}) => ({
  type: types.REMOVE_ESTIMATE_ITEM,
  payload,
});

/**
 * Action creator for converting an estimate to an invoice.
 * @param {string} id - The ID of the estimate to convert.
 * @param {function} onSuccess - Callback function to execute on successful conversion.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export const convertToInvoice = (id, onSuccess) => ({
  type: types.CONVERT_TO_INVOICE,
  payload: {id, onSuccess},
});

/**
 * Action creator for changing the status of an estimate.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const changeEstimateStatus = (payload = {}) => ({
  type: types.CHANGE_ESTIMATE_STATUS,
  payload,
});

/**
 * Action creator for sending an estimate.
 * @param {Object} [payload={}] - The payload containing necessary data for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const sendEstimate = (payload = {}) => ({
  type: types.SEND_ESTIMATE,
  payload,
});
