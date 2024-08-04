import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch item-units from the server.
 * @param {Object} q - The query parameters.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchItemUnits = (q) => {
  return Request.get(`/units?${queryString.stringify(q)}`);
};

/**
 * Add a new item-unit to the server.
 * @param {Object} data - The data for the new item-unit.
 * @returns {Promise} - The promise resolving to the response.
 */
export const addItemUnit = (data) => {
  return Request.post(`/units`, data);
};

/**
 * Update an existing item-unit on the server.
 * @param {Object} data - The data for the item-unit, including its id.
 * @returns {Promise} - The promise resolving to the response.
 */
export const updateItemUnit = (data) => {
  return Request.put(`/units/${data.id}`, data);
};

/**
 * Remove an item-unit from the server.
 * @param {string} id - The id of the item-unit to remove.
 * @returns {Promise} - The promise resolving to the response.
 */
export const removeItemUnit = (id) => {
  return Request.delete(`/units/${id}`);
};
