import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch payments from the server.
 * @param {Object} q - The query parameters for fetching payments.
 * @returns {Promise<*>} The response from the server.
 */
export const fetchPayments = (q) => {
  return Request.get(`/payments?${queryString.stringify(q)}`);
};

/**
 * Fetch a single payment by ID.
 * @param {string} id - The ID of the payment to fetch.
 * @returns {Promise<*>} The response from the server.
 */
export const fetchSinglePayment = (id) => {
  return Request.get(`/payments/${id}`);
};

/**
 * Add a new payment.
 * @param {Object} data - The payment data to add.
 * @returns {Promise<*>} The response from the server.
 */
export const addPayment = (data) => {
  return Request.post(`/payments`, data);
};

/**
 * Update an existing payment by ID.
 * @param {string} id - The ID of the payment to update.
 * @param {Object} data - The updated payment data.
 * @returns {Promise<*>} The response from the server.
 */
export const updatePayment = (id, data) => {
  return Request.put(`/payments/${id}`, data);
};

/**
 * Remove a payment by ID.
 * @param {string} id - The ID of the payment to remove.
 * @returns {Promise<*>} The response from the server.
 */
export const removePayment = (id) => {
  return Request.post(`/payments/delete`, {ids: [id]});
};

/**
 * Send a payment receipt.
 * @param {string} id - The ID of the payment.
 * @param {Object} data - The data for the receipt.
 * @returns {Promise<*>} The response from the server.
 */
export const sendPaymentReceipt = (id, data) => {
  return Request.post(`/payments/${id}/send`, data);
};

/**
 * Fetch payment invoices from the server.
 * @param {Object} q - The query parameters for fetching invoices.
 * @returns {Promise<*>} The response from the server.
 */
export const fetchPaymentInvoices = (q) => {
  return Request.get(`/invoices?${queryString.stringify(q)}`);
};

/**
 * Fetch the next payment number.
 * @param {Object} q - The query parameters for fetching the next payment number.
 * @returns {Promise<*>} The response from the server.
 */
export const fetchNextPaymentNumber = (q) => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};
