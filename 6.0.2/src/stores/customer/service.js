import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch customers from the server.
 * @param {Object} q - The query parameters.
 * @returns {Promise<*>} - The response from the server.
 */
export const fetchCustomers = (q) => {
  return Request.get(`/customers?${queryString.stringify(q)}`);
};

/**
 * Fetch a single customer by ID.
 * @param {string} id - The ID of the customer.
 * @returns {Promise<*>} - The response from the server.
 */
export const fetchSingleCustomer = (id) => {
  return Request.get(`/customers/${id}`);
};

/**
 * Add a new customer.
 * @param {Object} data - The data for the new customer.
 * @returns {Promise<*>} - The response from the server.
 */
export const addCustomer = (data) => {
  return Request.post(`/customers`, data);
};

/**
 * Update an existing customer.
 * @param {string} id - The ID of the customer.
 * @param {Object} data - The updated data for the customer.
 * @returns {Promise<*>} - The response from the server.
 */
export const updateCustomer = (id, data) => {
  return Request.put(`/customers/${id}`, data);
};

/**
 * Remove a customer by ID.
 * @param {string} id - The ID of the customer.
 * @returns {Promise<*>} - The response from the server.
 */
export const removeCustomer = (id) => {
  return Request.post(`/customers/delete`, {ids: [id]});
};
