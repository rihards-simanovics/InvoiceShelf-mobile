import Request from '@/utils/request';

/**
 * Fetch tax and discount per item from the API.
 * @returns {Promise} The API response.
 */
export const fetchTaxAndDiscountPerItem = () => {
  return Request.get(`/company/settings`, {
    axiosProps: {
      params: {settings: ['tax_per_item', 'discount_per_item']},
    },
  });
};

/**
 * Check the exchange rate for a given currency ID.
 * @param {string} id - The currency ID.
 * @returns {Promise} The API response.
 */
export const checkExchangeRate = (id) =>
  Request.get(`/currencies/${id}/exchange-rate`);

/**
 * Check the active exchange rate provider for a given currency ID.
 * @param {string} id - The currency ID.
 * @returns {Promise} The API response.
 */
export const checkExchangeRateProvider = (id) =>
  Request.get(`/currencies/${id}/active-provider`);

/**
 * Ping the endpoint URL to check its availability.
 * @param {string} url - The URL to ping.
 * @returns {Promise} The API response.
 */
export const pingUrl = (url) => {
  return Request.get(`ping`, {isPing: `${url}/api/`});
};

/**
 * Check the current app version.
 * @returns {Promise} The API response.
 */
export const checkAppVersion = () => {
  return Request.get('/app/version');
};

/**
 * Fetch bootstrap data from the API.
 * @returns {Promise} The API response.
 */
export const fetchBootstrap = () => {
  return Request.get('/bootstrap');
};

/**
 * Fetch the list of countries from the API.
 * @returns {Promise} The API response.
 */
export const fetchCountries = () => {
  return Request.get('/countries');
};

/**
 * Class to manage common services.
 */
class Services {
  isCountriesItemLoaded: boolean;

  constructor() {
    this.isCountriesItemLoaded = false;
  }

  /**
   * Set the countries item loaded status to true.
   */
  setIsCountriesItemLoaded = () => (this.isCountriesItemLoaded = true);
}

export const CommonServices = new Services();
