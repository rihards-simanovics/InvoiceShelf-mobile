import * as types from './types';

/**
 * Action creator to set biometry authentication type.
 * @param payload - The payload containing the authentication type.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const setBiometryAuthType = (payload) => ({
  type: types.SET_BIOMETRY_AUTH_TYPE,
  payload,
});

/**
 * Action creator to fetch mail configuration.
 * @param payload - The payload for fetching mail configuration.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchMailConfig = (payload) => ({
  type: types.FETCH_MAIL_CONFIG,
  payload,
});
