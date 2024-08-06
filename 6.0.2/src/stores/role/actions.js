import * as types from './types';

/**
 * Creates an action to set the loading spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The spinner state (true for loading, false for not).
 * @returns {{type: string, payload: {name: string, value: boolean}}} The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Creates an action to fetch roles.
 * @param {Object} payload - The payload for fetching roles.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchRoles(payload = {}) {
  return {
    type: types.FETCH_ROLES,
    payload,
  };
}

/**
 * Creates an action to fetch a single role.
 * @param {string} id - The ID of the role to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} The action object.
 */
export function fetchSingleRole(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_ROLE,
    payload: {id, onSuccess},
  };
}

/**
 * Creates an action to fetch permissions.
 * @param {Object} payload - The payload for fetching permissions.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function fetchPermissions(payload = {}) {
  return {
    type: types.FETCH_PERMISSIONS,
    payload,
  };
}

/**
 * Creates an action to add a new role.
 * @param {Object} payload - The payload containing role data.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function addRole(payload = {}) {
  return {
    type: types.ADD_ROLE,
    payload,
  };
}

/**
 * Creates an action to update an existing role.
 * @param {Object} payload - The payload containing updated role data.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function updateRole(payload = {}) {
  return {
    type: types.UPDATE_ROLE,
    payload,
  };
}

/**
 * Creates an action to remove a role.
 * @param {string} id - The ID of the role to remove.
 * @returns {{type: string, payload: {id: string}}} The action object.
 */
export function removeRole(id) {
  return {
    type: types.REMOVE_ROLE,
    payload: {id},
  };
}

/**
 * Creates an action to update a permission.
 * @param {Object} payload - The payload containing permission data.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function updatePermission(payload = {}) {
  return {
    type: types.UPDATE_PERMISSION,
    payload,
  };
}

/**
 * Creates an action to select all permissions.
 * @param {Object} payload - The payload for selecting permissions.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function selectAllPermissions(payload = {}) {
  return {
    type: types.SELECT_ALL_PERMISSIONS,
    payload,
  };
}

/**
 * Creates an action to reset permissions.
 * @param {Object} payload - The payload for resetting permissions.
 * @returns {{type: string, payload: Object}} The action object.
 */
export function resetPermissions(payload = {}) {
  return {
    type: types.RESET_PERMISSIONS,
    payload,
  };
}
