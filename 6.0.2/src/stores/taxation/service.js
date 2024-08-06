import Request from 'utils/request';

/**
 * Fetches the sales tax rate from the API.
 * @param {Object} data - The data containing address and other necessary information.
 * @returns {Promise<Object>} - The response from the API.
 */
export const fetchSalesTaxRate = (data) => {
  return Request.post(
    `/api/m/sales-tax-us/current-tax`,
    {...data, address: data},
    {'base-url': true}
  );
};
