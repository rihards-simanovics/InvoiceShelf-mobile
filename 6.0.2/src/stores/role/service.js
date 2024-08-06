import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetches roles from the server.
 * @param {Object} q - The query parameters for fetching roles.
 * @returns {Promise<Object>} The response from the server.
 */
export const fetchRoles = (q) => {
  return Request.get(`/roles?${queryString.stringify(q)}`);
};

/**
 * Fetches a single role by ID.
 * @param {string} id - The ID of the role to fetch.
 * @returns {Promise<Object>} The response from the server.
 */
export const fetchSingleRole = (id) => {
  return Request.get(`/roles/${id}`);
};

/**
 * Fetches permissions from the server.
 * @returns {Promise<Object>} The response from the server.
 */
export const fetchPermissions = () => {
  return Request.get(`/abilities`);
};

/**
 * Adds a new role to the server.
 * @param {Object} data - The data for the new role.
 * @returns {Promise<Object>} The response from the server.
 */
export const addRole = (data) => {
  return Request.post(`/roles`, data);
};

/**
 * Updates an existing role by ID.
 * @param {string} id - The ID of the role to update.
 * @param {Object} data - The updated data for the role.
 * @returns {Promise<Object>} The response from the server.
 */
export const updateRole = (id, data) => {
  return Request.put(`/roles/${id}`, data);
};

/**
 * Removes a role by ID.
 * @param {string} id - The ID of the role to remove.
 * @returns {Promise<Object>} The response from the server.
 */
export const removeRole = (id) => {
  return Request.delete(`/roles/${id}`);
};
