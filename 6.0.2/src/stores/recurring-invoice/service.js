import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetches the next invoice date based on provided parameters.
 * @param {Object} data - The parameters for the request.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchNextInvoiceAt = (data) => {
  return Request.get(
    `/recurring-invoice-frequency?${queryString.stringify(data)}`
  );
};

/**
 * Fetches the invoice templates.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchInvoiceTemplates = () => {
  return Request.get(`/invoices/templates`);
};

/**
 * Fetches recurring invoices based on query parameters.
 * @param {Object} q - The query parameters.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchRecurringInvoices = (q) => {
  return Request.get(`/recurring-invoices?${queryString.stringify(q)}`);
};

/**
 * Fetches a single recurring invoice by ID.
 * @param {string} id - The ID of the recurring invoice.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchSingleRecurringInvoice = (id) => {
  return Request.get(`/recurring-invoices/${id}`);
};

/**
 * Adds a new recurring invoice.
 * @param {Object} data - The data for the new invoice.
 * @returns {Promise} - The promise resolving to the response.
 */
export const addRecurringInvoice = (data) => {
  return Request.post(`/recurring-invoices`, data);
};

/**
 * Updates an existing recurring invoice by ID.
 * @param {string} id - The ID of the recurring invoice.
 * @param {Object} data - The updated data for the invoice.
 * @returns {Promise} - The promise resolving to the response.
 */
export const updateRecurringInvoice = (id, data) => {
  return Request.put(`/recurring-invoices/${id}`, data);
};

/**
 * Removes a recurring invoice by ID.
 * @param {string} id - The ID of the recurring invoice.
 * @returns {Promise} - The promise resolving to the response.
 */
export const removeRecurringInvoice = (id) => {
  return Request.post(`/recurring-invoices/delete`, {ids: [id]});
};
