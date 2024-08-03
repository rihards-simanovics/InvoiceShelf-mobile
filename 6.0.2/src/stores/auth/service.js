import Request from 'utils/request';

/**
 * Sends a login request to the server.
 * @param {Object} data - The login data.
 * @returns {Promise<Object>} The response from the server.
 */
export const login = (data) => {
  return Request.post('/auth/login', data);
};

/**
 * Sends a recovery email to the specified address.
 * @param {string} email - The email address to send the recovery email to.
 * @returns {Promise<Object>} The response from the server.
 */
export const sendRecoveryEmail = (email) => {
  return Request.post('/auth/password/email', {email});
};
