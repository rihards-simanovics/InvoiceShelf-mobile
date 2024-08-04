import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetches invoice templates from the server.
 * @returns {Promise} A promise that resolves to the response containing invoice templates.
 */
export const fetchInvoiceTemplates = () => {
  return Request.get(`/invoices/templates`);
};

/**
 * Fetches invoices based on the provided query parameters.
 * @param {Object} q - The query parameters for fetching invoices.
 * @returns {Promise} A promise that resolves to the response containing invoices.
 */
export const fetchInvoices = (q) => {
  return Request.get(`/invoices?${queryString.stringify(q)}`);
};

/**
 * Fetches a single invoice by its ID.
 * @param {string} id - The ID of the invoice to fetch.
 * @returns {Promise} A promise that resolves to the response containing the invoice.
 */
export const fetchSingleInvoice = (id) => {
  return Request.get(`/invoices/${id}`);
};

/**
 * Adds a new invoice with the provided data.
 * @param {Object} data - The data for the new invoice.
 * @returns {Promise} A promise that resolves to the response after adding the invoice.
 */
export const addInvoice = (data) => {
  return Request.post(`/invoices`, data);
};

/**
 * Updates an existing invoice by its ID with the provided data.
 * @param {string} id - The ID of the invoice to update.
 * @param {Object} data - The updated data for the invoice.
 * @returns {Promise} A promise that resolves to the response after updating the invoice.
 */
export const updateInvoice = (id, data) => {
  return Request.put(`/invoices/${id}`, data);
};

/**
 * Changes the status of an invoice based on the provided action and data.
 * @param {string} action - The action to perform on the invoice status.
 * @param {Object} data - The data related to the status change.
 * @returns {Promise} A promise that resolves to the response after changing the invoice status.
 */
export const changeInvoiceStatus = (action, data) => {
  return Request.post(`/invoices/${action}`, data);
};

/**
 * Removes an invoice by its ID.
 * @param {string} id - The ID of the invoice to remove.
 * @returns {Promise} A promise that resolves to the response after removing the invoice.
 */
export const removeInvoice = (id) => {
  return Request.post(`/invoices/delete`, {ids: [id]});
};

/**
 * Fetches the next invoice number based on the provided query parameters.
 * @param {Object} q - The query parameters for fetching the next invoice number.
 * @returns {Promise} A promise that resolves to the response containing the next invoice number.
 */
export const fetchNextInvoiceNumber = (q) => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};

/**
 * Sends an invoice by its ID with the provided data.
 * @param {string} id - The ID of the invoice to send.
 * @param {Object} data - The data related to sending the invoice.
 * @returns {Promise} A promise that resolves to the response after sending the invoice.
 */
export const sendInvoice = (id, data) => {
  return Request.post(`/invoices/${id}/send`, data);
};

/**
 * Class representing invoice services.
 */
class Services {
  isFirstInvoiceCreated: boolean;

  constructor() {
    this.isFirstInvoiceCreated = false; // Indicates if the first invoice has been created.
  }

  /**
   * Toggles the status of whether the first invoice has been created.
   * @param {boolean} status - The new status for the first invoice creation.
   */
  toggleIsFirstInvoiceCreated = (status) =>
    (this.isFirstInvoiceCreated = status);
}

// Exporting a singleton instance of Services.
export const InvoiceServices = new Services();
