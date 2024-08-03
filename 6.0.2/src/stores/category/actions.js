import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching categories.
 * @param {Object} [payload={}] - The payload for fetching categories.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchCategories(payload = {}) {
  return {
    type: types.FETCH_CATEGORIES,
    payload,
  };
}

/**
 * Action creator for fetching a single category.
 * @param {string} id - The ID of the category to fetch.
 * @param {Function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: Function}}} The action object.
 */
export function fetchSingleCategory(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CATEGORY,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for adding a category.
 * @param {Object} [payload={}] - The payload for adding a category.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function addCategory(payload = {}) {
  return {
    type: types.ADD_CATEGORY,
    payload,
  };
}

/**
 * Action creator for updating a category.
 * @param {Object} [payload={}] - The payload for updating a category.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function updateCategory(payload = {}) {
  return {
    type: types.UPDATE_CATEGORY,
    payload,
  };
}

/**
 * Action creator for removing a category.
 * @param {string} id - The ID of the category to remove.
 * @returns {{type: string, payload: {id: string}}} The action object.
 */
export function removeCategory(id) {
  return {
    type: types.REMOVE_CATEGORY,
    payload: {id},
  };
}
