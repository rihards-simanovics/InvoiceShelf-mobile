import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch users from the API.
 * @param {Object} q - The query parameters for fetching users.
 * @returns {Promise} - The API response.
 */
export const fetchUsers = (q) => {
  return Request.get(`/users?${queryString.stringify(q)}`);
};

/**
 * Fetch a single user by ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise} - The API response.
 */
export const fetchSingleUser = (id) => {
  return Request.get(`/users/${id}`);
};

/**
 * Add a new user.
 * @param {Object} data - The user data to add.
 * @returns {Promise} - The API response.
 */
export const addUser = (data) => {
  return Request.post(`/users`, data);
};

/**
 * Update an existing user.
 * @param {string} id - The ID of the user to update.
 * @param {Object} data - The updated user data.
 * @returns {Promise} - The API response.
 */
export const updateUser = (id, data) => {
  return Request.put(`/users/${id}`, data);
};

/**
 * Remove a user by ID.
 * @param {string} id - The ID of the user to remove.
 * @returns {Promise} - The API response.
 */
export const removeUser = (id) => {
  return Request.post(`/users/delete`, {users: [id]});
};
