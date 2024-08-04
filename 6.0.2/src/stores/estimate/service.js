import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetches estimate templates from the server.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const fetchEstimateTemplates = () => {
  return Request.get(`/estimates/templates`);
};

/**
 * Fetches estimates based on the provided query string.
 * @param {Object} q - The query string parameters.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const fetchEstimates = (q) => {
  return Request.get(`/estimates?${queryString.stringify(q)}`);
};

/**
 * Fetches a single estimate by its ID.
 * @param {string} id - The ID of the estimate.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const fetchSingleEstimate = (id) => {
  return Request.get(`/estimates/${id}`);
};

/**
 * Adds a new estimate.
 * @param {Object} data - The data for the new estimate.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const addEstimate = (data) => {
  return Request.post(`/estimates`, data);
};

/**
 * Updates an existing estimate by its ID.
 * @param {string} id - The ID of the estimate.
 * @param {Object} data - The updated data for the estimate.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const updateEstimate = (id, data) => {
  return Request.put(`/estimates/${id}`, data);
};

/**
 * Changes the status of an estimate.
 * @param {string} action - The action to perform (e.g., 'mark_as_sent').
 * @param {Object} data - The data for the status change.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const changeEstimateStatus = (action, data) => {
  return Request.post(`/estimates/${action}`, data);
};

/**
 * Removes an estimate by its ID.
 * @param {string} id - The ID of the estimate to remove.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const removeEstimate = (id) => {
  return Request.post(`/estimates/delete`, {ids: [id]});
};

/**
 * Converts an estimate to an invoice by its ID.
 * @param {string} id - The ID of the estimate to convert.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const convertToInvoice = (id) => {
  return Request.post(`/estimates/${id}/convert-to-invoice`);
};

/**
 * Fetches the next estimate number based on the provided query string.
 * @param {Object} q - The query string parameters.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const fetchNextEstimateNumber = (q) => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};

/**
 * Sends an estimate by its ID.
 * @param {string} id - The ID of the estimate to send.
 * @param {Object} data - The data to send with the estimate.
 * @returns {Promise} - The promise resolving to the response data.
 */
export const sendEstimate = (id, data) => {
  return Request.post(`/estimates/${id}/send`, data);
};
