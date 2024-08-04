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
 * Action creator for fetching items.
 * @param {Object} payload - The payload for fetching items.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchItems = (payload = {}) => ({
  type: types.FETCH_ITEMS,
  payload,
});

/**
 * Action creator for fetching initial details of an item.
 * @param {Object} payload - The payload for fetching initial details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchItemInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for adding an item.
 * @param {Object} payload - The payload for adding an item.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addItem = (payload = {}) => ({
  type: types.ADD_ITEM,
  payload,
});

/**
 * Action creator for updating an item.
 * @param {Object} payload - The payload for updating an item.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const updateItem = (payload = {}) => ({
  type: types.UPDATE_ITEM,
  payload,
});

/**
 * Action creator for removing an item.
 * @param {string} id - The ID of the item to remove.
 * @param {Object} navigation - The navigation object.
 * @param {Function} onFail - Callback function to call on failure.
 * @returns {{type: string, payload: {id: string, navigation: Object, onFail: Function}}} - The action object.
 */
export const removeItem = (id, navigation, onFail) => ({
  type: types.REMOVE_ITEM,
  payload: {id, navigation, onFail},
});
