import * as types from './types';

/**
 * Action creator for setting a spinner state.
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
 * Action creator for fetching companies.
 * @param {Object} [payload={}] - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchCompanies(payload = {}) {
  return {
    type: types.FETCH_COMPANIES,
    payload,
  };
}

/**
 * Action creator for adding a company.
 * @param {Object} params - The parameters for the company.
 * @param {File} logo - The logo file for the company.
 * @returns {{type: string, payload: {params: Object, logo: File}}} The action object.
 */
export function addCompany(params, logo) {
  return {
    type: types.ADD_COMPANY,
    payload: {params, logo},
  };
}

/**
 * Action creator for updating a company.
 * @param {Object} params - The parameters for the company.
 * @param {File|null} [logo=null] - The logo file for the company (optional).
 * @returns {{type: string, payload: {params: Object, logo: File|null}}} The action object.
 */
export function updateCompany(params, logo = null) {
  return {
    type: types.UPDATE_COMPANY,
    payload: {params, logo},
  };
}

/**
 * Action creator for fetching preferences.
 * @param {Function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {onSuccess: Function}}} The action object.
 */
export function fetchPreferences(onSuccess) {
  return {
    type: types.FETCH_PREFERENCES,
    payload: {onSuccess},
  };
}

/**
 * Action creator for updating preferences.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const updatePreferences = (payload) => ({
  type: types.UPDATE_PREFERENCES,
  payload,
});

/**
 * Action creator for fetching company initial details.
 * @param {boolean} isCreateScreen - Indicates if it's a create screen.
 * @param {Function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {isCreateScreen: boolean, onSuccess: Function}}} The action object.
 */
export const fetchCompanyInitialDetails = (isCreateScreen, onSuccess) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload: {isCreateScreen, onSuccess},
});

/**
 * Action creator for setting the selected company.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const setSelectedCompany = (payload) => ({
  type: types.SET_SELECTED_COMPANY,
  payload,
});

/**
 * Action creator for setting company settings.
 * @param {Object} [payload={}] - The payload for the action.
 * @returns {{type: string, payload: Object}} The action object.
 */
export const setCompanySetting = (payload = {}) => ({
  type: types.SET_COMPANY_SETTING,
  payload,
});

/**
 * Action creator for fetching company settings.
 * @param {Array|null} [keys=null] - The keys for the settings (optional).
 * @param {Function|null} [onSuccess=null] - Callback function to execute on success (optional).
 * @returns {{type: string, payload: {keys: Array|null, onSuccess: Function|null}}} The action object.
 */
export const fetchCompanySettings = (keys = null, onSuccess = null) => ({
  type: types.FETCH_COMPANY_SETTINGS,
  payload: {keys, onSuccess},
});

/**
 * Action creator for updating company settings.
 * @param {Object} params - The parameters for the settings.
 * @param {Object|null} [navigation=null] - The navigation object (optional).
 * @returns {{type: string, payload: {params: Object, navigation: Object|null}}} The action object.
 */
export const updateCompanySettings = (params, navigation = null) => ({
  type: types.UPDATE_COMPANY_SETTINGS,
  payload: {params, navigation},
});
