import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch payment modes from the server.
 * @param {Object} q - The query parameters.
 * @returns {Promise<*>} The response from the server.
 */
export const fetchPaymentModes = (q) => {
  return Request.get(`/payment-methods?${queryString.stringify(q)}`);
};

/**
 * Add a new payment mode.
 * @param {Object} data - The payment mode data.
 * @returns {Promise<*>} The response from the server.
 */
export const addPaymentMode = (data) => {
  return Request.post(`/payment-methods`, data);
};

/**
 * Update an existing payment mode.
 * @param {Object} data - The payment mode data including the id.
 * @returns {Promise<*>} The response from the server.
 */
export const updatePaymentMode = (data) => {
  return Request.put(`/payment-methods/${data.id}`, data);
};

/**
 * Remove a payment mode by id.
 * @param {string} id - The id of the payment mode to remove.
 * @returns {Promise<*>} The response from the server.
 */
export const removePaymentMode = (id) => {
  return Request.delete(`/payment-methods/${id}`);
};
