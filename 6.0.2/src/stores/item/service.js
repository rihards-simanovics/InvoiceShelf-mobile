import {pick} from 'lodash';
import * as queryString from 'query-string';
import Request from '@/utils/request';

/**
 * Fetch items from the server.
 * @param {Object} q - The query parameters.
 * @returns {Promise} - The promise resolving to the response.
 */
export const fetchItems = (q) =>
  Request.get(`/items?${queryString.stringify(q)}`);

/**
 * Add a new item to the server.
 * @param {Object} item - The item data to add.
 * @returns {Promise} - The promise resolving to the response.
 */
export const addItem = (item) => {
  const data = pick(item, [
    'name',
    'description',
    'price',
    'unit_id',
    'taxes',
    'customFields',
  ]);
  return Request.post(`/items`, data);
};

/**
 * Update an existing item on the server.
 * @param {Object} item - The item data to update.
 * @returns {Promise} - The promise resolving to the response.
 */
export const updateItem = (item) => Request.put(`/items/${item?.id}`, item);

/**
 * Remove an item from the server.
 * @param {Object} id - The ID of the item to remove.
 * @returns {Promise} - The promise resolving to the response.
 */
export const removeItem = ({id}) => Request.post(`/items/delete`, {ids: [id]});
