import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true for loading, false for not).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching users.
 * @param {Object} payload - The payload for fetching users.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchUsers(payload = {}) {
  return {
    type: types.FETCH_USERS,
    payload,
  };
}

/**
 * Action creator for fetching a single user.
 * @param {string} id - The ID of the user to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export function fetchSingleUser(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_USER,
    payload: {id, onSuccess},
  };
}

/**
 * Action creator for adding a user.
 * @param {Object} payload - The payload containing user data.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function addUser(payload = {}) {
  return {
    type: types.ADD_USER,
    payload,
  };
}

/**
 * Action creator for updating a user.
 * @param {Object} payload - The payload containing updated user data.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function updateUser(payload = {}) {
  return {
    type: types.UPDATE_USER,
    payload,
  };
}

/**
 * Action creator for removing a user.
 * @param {string} id - The ID of the user to remove.
 * @returns {{type: string, payload: {id: string}}} - The action object.
 */
export function removeUser(id) {
  return {
    type: types.REMOVE_USER,
    payload: {id},
  };
}

/**
 * Action creator for fetching initial user details.
 * @param {Object} payload - The payload for fetching initial details.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchUserInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});
