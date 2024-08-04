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
 * Action creator for fetching custom fields.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchCustomFields(payload = {}) {
  return {
    type: types.FETCH_CUSTOM_FIELDS,
    payload,
  };
}

/**
 * Action creator for fetching a single custom field.
 * @param {string} id - The ID of the custom field to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export function fetchSingleCustomField(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CUSTOM_FIELD,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for adding a custom field.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function addCustomField(payload = {}) {
  return {
    type: types.ADD_CUSTOM_FIELD,
    payload,
  };
}

/**
 * Action creator for updating a custom field.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function updateCustomField(payload = {}) {
  return {
    type: types.UPDATE_CUSTOM_FIELD,
    payload,
  };
}

/**
 * Action creator for removing a custom field.
 * @param {string} id - The ID of the custom field to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export function removeCustomField(id) {
  return {
    type: types.REMOVE_CUSTOM_FIELD,
    payload: {id},
  };
}
