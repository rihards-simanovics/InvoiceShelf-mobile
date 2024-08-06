import * as types from './types';

/**
 * Action creator for setting a spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching the current user.
 * @param {Object} payload - The payload containing user data.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export function fetchCurrentUser(payload) {
  return {
    type: types.FETCH_CURRENT_USER,
    payload,
  };
}

/**
 * Action creator for updating the current user.
 * @param {Object} params - The parameters for updating the user.
 * @param {File} avatar - The avatar file to be uploaded.
 * @returns {{type: string, payload: {params: Object, avatar: File}}} - The action object.
 */
export function updateCurrentUser(params, avatar) {
  return {
    type: types.UPDATE_CURRENT_USER,
    payload: {params, avatar},
  };
}

/**
 * Action creator for setting the current user.
 * @param {Object} payload - The payload containing user data.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const setCurrentUser = (payload) => ({
  type: types.SET_CURRENT_USER,
  payload,
});

/**
 * Action creator for setting user settings.
 * @param {Object} [payload={}] - The payload containing user settings.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const setUserSetting = (payload = {}) => ({
  type: types.SET_USER_SETTING,
  payload,
});
