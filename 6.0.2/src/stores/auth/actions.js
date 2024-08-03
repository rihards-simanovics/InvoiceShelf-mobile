import * as types from './types';

/**
 * Action creator for user login.
 * @param {Object} params - The parameters for login.
 * @param {Function} onResult - Callback function to execute on result.
 * @returns {{type: string, payload: {params: Object, onResult: Function}}} The action object.
 */
export function login(params, onResult) {
  return {
    type: types.LOGIN,
    payload: {params, onResult},
  };
}

/**
 * Action creator for biometry login.
 * @param {Object} payload - The payload for biometry login.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function biometryAuthLogin(payload) {
  return {
    type: types.BIOMETRY_AUTH_LOGIN,
    payload,
  };
}

/**
 * Action creator for successful login.
 * @returns {{type: string, payload: null}} The action object.
 */
export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
    payload: null,
  };
}

/**
 * Action creator for successful logout.
 * @returns {{type: string, payload: null}} The action object.
 */
export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: null,
  };
}

/**
 * Action creator for saving user ID token.
 * @param {string} token - The ID token to save.
 * @returns {{type: string, payload: string}} The action object.
 */
export function saveIdToken(token) {
  return {
    type: types.SAVE_ID_TOKEN,
    payload: token,
  };
}

/**
 * Action creator for sending a forgot password email.
 * @param {Object} [payload={}] - The payload for sending the email.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function sendForgotPasswordMail(payload = {}) {
  return {
    type: types.SEND_FORGOT_PASSWORD_MAIL,
    payload,
  };
}
