import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetches a list of taxes based on query parameters.
 * @param {Object} q - The query parameters for fetching taxes.
 * @returns {Promise<*>} - The promise resolving to the fetched taxes.
 */
export const fetchTaxes = (q) => {
  return Request.get(`/tax-types?${queryString.stringify(q)}`); // Make a GET request to fetch taxes
};

/**
 * Fetches a single tax by ID.
 * @param {string} id - The ID of the tax to fetch.
 * @returns {Promise<*>} - The promise resolving to the fetched tax.
 */
export const fetchSingleTax = (id) => {
  return Request.get(`/tax-types/${id}`); // Make a GET request to fetch a single tax
};

/**
 * Adds a new tax.
 * @param {Object} data - The data for the new tax.
 * @returns {Promise<*>} - The promise resolving to the added tax.
 */
export const addTax = (data) => {
  return Request.post(`/tax-types`, data); // Make a POST request to add a new tax
};

/**
 * Updates an existing tax by ID.
 * @param {string} id - The ID of the tax to update.
 * @param {Object} data - The updated data for the tax.
 * @returns {Promise<*>} - The promise resolving to the updated tax.
 */
export const updateTax = (id, data) => {
  return Request.put(`/tax-types/${id}`, data); // Make a PUT request to update the tax
};

/**
 * Removes a tax by ID.
 * @param {string} id - The ID of the tax to remove.
 * @returns {Promise<*>} - The promise resolving to the removal confirmation.
 */
export const removeTax = (id) => {
  return Request.delete(`/tax-types/${id}`); // Make a DELETE request to remove the tax
};
