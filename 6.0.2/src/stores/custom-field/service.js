import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch custom fields from the server.
 * @param {Object} q - The query parameters.
 * @returns {Promise<*>} - The response from the server.
 */
export const fetchCustomFields = (q) => {
  return Request.get(`/custom-fields?${queryString.stringify(q)}`);
};

/**
 * Fetch a single custom field by ID.
 * @param {string} id - The ID of the custom field.
 * @returns {Promise<*>} - The response from the server.
 */
export const fetchSingleCustomField = (id) => {
  return Request.get(`/custom-fields/${id}`);
};

/**
 * Add a new custom field.
 * @param {Object} data - The data for the new custom field.
 * @returns {Promise<*>} - The response from the server.
 */
export const addCustomField = (data) => {
  return Request.post(`/custom-fields`, data);
};

/**
 * Update an existing custom field.
 * @param {string} id - The ID of the custom field.
 * @param {Object} data - The updated data for the custom field.
 * @returns {Promise<*>} - The response from the server.
 */
export const updateCustomField = (id, data) => {
  return Request.put(`/custom-fields/${id}`, data);
};

/**
 * Remove a custom field by ID.
 * @param {string} id - The ID of the custom field.
 * @returns {Promise<*>} - The response from the server.
 */
export const removeCustomField = (id) => {
  return Request.delete(`/custom-fields/${id}`);
};
