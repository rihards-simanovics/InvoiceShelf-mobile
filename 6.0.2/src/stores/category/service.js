import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetches categories from the server.
 * @param {Object} q - The query parameters for fetching categories.
 * @returns {Promise<Object>} The response from the server.
 */
export const fetchCategories = (q) => {
  return Request.get(`/categories?${queryString.stringify(q)}`);
};

/**
 * Fetches a single category by ID.
 * @param {string} id - The ID of the category to fetch.
 * @returns {Promise<Object>} The response from the server.
 */
export const fetchSingleCategory = (id) => {
  return Request.get(`/categories/${id}`);
};

/**
 * Adds a new category.
 * @param {Object} data - The data for the new category.
 * @returns {Promise<Object>} The response from the server.
 */
export const addCategory = (data) => {
  return Request.post(`/categories`, data);
};

/**
 * Updates an existing category by ID.
 * @param {string} id - The ID of the category to update.
 * @param {Object} data - The updated data for the category.
 * @returns {Promise<Object>} The response from the server.
 */
export const updateCategory = (id, data) => {
  return Request.put(`/categories/${id}`, data);
};

/**
 * Removes a category by ID.
 * @param {string} id - The ID of the category to remove.
 * @returns {Promise<Object>} The response from the server.
 */
export const removeCategory = (id) => {
  return Request.delete(`/categories/${id}`);
};
