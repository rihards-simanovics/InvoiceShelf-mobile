import Request from 'utils/request';
import * as types from './types';

/**
 * Fetch companies from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchCompanies = () => {
  return Request.get(`/companies`);
};

/**
 * Fetch the current company from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchCompany = () => {
  return Request.get(`/current-company`);
};

/**
 * Add a new company.
 * @param {Object} data - The data for the new company.
 * @returns {Promise<Object>} The response from the API.
 */
export const addCompany = (data) => {
  return Request.post(`/companies`, data);
};

/**
 * Update an existing company.
 * @param {Object} data - The data for the company update.
 * @returns {Promise<Object>} The response from the API.
 */
export const updateCompany = (data) => {
  return Request.put(`/company`, data);
};

/**
 * Fetch currencies from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchCurrencies = () => {
  return Request.get(`/currencies`);
};

/**
 * Fetch timezones from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchTimezones = () => {
  return Request.get(`/timezones`);
};

/**
 * Fetch date formats from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchDateFormats = () => {
  return Request.get(`/date/formats`);
};

/**
 * Fetch preferences from the API.
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchPreferences = () => {
  return Request.get(`/company/settings`, {
    axiosProps: {
      params: {settings: types.PREFERENCES_SETTING_KEYS},
    },
  });
};

/**
 * Update preferences in the API.
 * @param {Object} data - The data for the preferences update.
 * @returns {Promise<Object>} The response from the API.
 */
export const updatePreferences = (data) => {
  return Request.post(`/company/settings`, data);
};

/**
 * Upload a company logo.
 * @param {File} logo - The logo file to upload.
 * @param {string} id - The company ID.
 * @returns {Promise<Object>} The response from the API.
 */
export const uploadCompanyLogo = (logo, id) => {
  return Request.post(
    `/company/upload-logo`,
    {},
    {image: logo, imageName: 'company_logo', headers: {company: id}}
  );
};

/**
 * Fetch company settings from the API.
 * @param {Array|null} settings - The keys for the settings (optional).
 * @returns {Promise<Object>} The response from the API.
 */
export const fetchCompanySettings = (settings) => {
  return Request.get(`/company/settings`, {
    axiosProps: {params: {settings: settings ?? types.COMPANY_SETTING_KEYS}},
  });
};

/**
 * Update company settings in the API.
 * @param {Object} settings - The settings to update.
 * @returns {Promise<Object>} The response from the API.
 */
export const updateCompanySettings = (settings) => {
  return Request.post(`/company/settings`, {settings});
};

/**
 * Class for managing company-related services.
 */
class Services {
  isPreferencesItemLoaded: boolean;
  isCurrenciesItemLoaded: boolean;

  constructor() {
    this.isPreferencesItemLoaded = false;
    this.isCurrenciesItemLoaded = false;
  }

  /**
   * Set preferences item loaded state to true.
   */
  setIsPreferencesItemLoaded = () => (this.isPreferencesItemLoaded = true);

  /**
   * Set currencies item loaded state to true.
   */
  setIsCurrenciesItemLoaded = () => (this.isCurrenciesItemLoaded = true);
}

// Export an instance of the Services class.
export const CompanyServices = new Services();
