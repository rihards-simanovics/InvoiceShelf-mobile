import * as types from './types';

/**
 * Action creator to fetch tax and discount per item.
 * @returns {{type: string, payload: *}} The action object.
 */
export function fetchTaxAndDiscountPerItem() {
  return {type: types.FETCH_TAX_AND_DISCOUNT_PER_ITEM};
}

/**
 * Action creator to save the endpoint URL.
 * @param {string} url - The endpoint URL to save.
 * @param {object} navigation - The navigation object for routing.
 * @param {function} onResult - Callback function to execute on result.
 * @returns {{type: string, payload: *}} The action object.
 */
export function saveEndpointURL(url, navigation, onResult) {
  return {
    type: types.SAVE_ENDPOINT_URL,
    payload: {url, navigation, onResult},
  };
}

/**
 * Action creator to fetch bootstrap data.
 * @param {object|null} payload - Optional payload for success callback.
 * @returns {{type: string, payload: *}} The action object.
 */
export function fetchBootstrap(payload = null) {
  return {
    type: types.FETCH_BOOTSTRAP,
    payload: {onSuccess: payload},
  };
}

/**
 * Action creator to check for OTA updates.
 * @param {object} payload - The payload for the action.
 * @returns {{type: string, payload: *}} The action object.
 */
export function checkOTAUpdate(payload = {}) {
  return {
    type: types.CHECK_OTA_UPDATE,
    payload,
  };
}

/**
 * Action creator to set the last OTA check date.
 * @param {object} payload - The payload containing the date.
 * @returns {{type: string, payload: *}} The action object.
 */
export function setLastOTACheckDate(payload = {}) {
  return {
    type: types.SET_LAST_OTA_CHECK_DATE,
    payload,
  };
}

/**
 * Action creator to fetch countries.
 * @returns {{type: string, payload: *}} The action object.
 */
export function fetchCountries() {
  return {
    type: types.FETCH_COUNTRIES,
    payload: {},
  };
}

/**
 * Action creator to check the exchange rate.
 * @param {string} id - The currency ID.
 * @param {function} onSuccess - Callback function on success.
 * @param {function} onFail - Callback function on failure.
 * @returns {{type: string, payload: *}} The action object.
 */
export function checkExchangeRate(id, onSuccess, onFail) {
  return {
    type: types.CHECK_EXCHANGE_RATE,
    payload: {id, onSuccess, onFail},
  };
}

/**
 * Action creator to check the exchange rate provider.
 * @param {string} id - The currency ID.
 * @param {function} onSuccess - Callback function on success.
 * @param {function} onFail - Callback function on failure.
 * @returns {{type: string, payload: *}} The action object.
 */
export function checkExchangeRateProvider(id, onSuccess, onFail) {
  return {
    type: types.CHECK_EXCHANGE_RATE_PROVIDER,
    payload: {id, onSuccess, onFail},
  };
}
