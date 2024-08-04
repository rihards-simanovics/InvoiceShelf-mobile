import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetches expenses based on the provided query string.
 * @param {Object} q - The query string parameters.
 * @returns {Promise<*>} - The response from the API.
 */
export const fetchExpenses = (q) => {
  return Request.get(`/expenses?${queryString.stringify(q)}`);
};

/**
 * Fetches a single expense by its ID.
 * @param {string} id - The ID of the expense.
 * @returns {Promise<*>} - The response from the API.
 */
export const fetchSingleExpense = (id) => {
  return Request.get(`/expenses/${id}`);
};

/**
 * Adds a new expense.
 * @param {Object} data - The expense data to add.
 * @returns {Promise<*>} - The response from the API.
 */
export const addExpense = (data) => {
  return Request.post(`/expenses`, data, {withMultipartFormData: false});
};

/**
 * Updates an existing expense by its ID.
 * @param {string} id - The ID of the expense.
 * @param {Object} data - The updated expense data.
 * @returns {Promise<*>} - The response from the API.
 */
export const updateExpense = (id, data) => {
  return Request.put(`/expenses/${id}`, data, {withMultipartFormData: false});
};

/**
 * Uploads an attachment receipt for an expense.
 * @param {string} id - The ID of the expense.
 * @param {File} attachmentReceipt - The receipt attachment.
 * @param {string} type - The type of request (create or edit).
 * @returns {Promise<*>} - The response from the API.
 */
export const uploadAttachmentReceipt = (id, attachmentReceipt, type) => {
  return Request.post(
    `/expenses/${id}/upload/receipts`,
    {},
    {image: attachmentReceipt, type, imageName: 'attachment_receipt'}
  );
};

/**
 * Removes an expense by its ID.
 * @param {string} id - The ID of the expense.
 * @returns {Promise<*>} - The response from the API.
 */
export const removeExpense = (id) => {
  return Request.post(`/expenses/delete`, {ids: [id]});
};
