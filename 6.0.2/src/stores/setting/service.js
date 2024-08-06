import Request from 'utils/request';

/**
 * Fetch mail configuration from the server.
 * @returns {Promise<*>} - The promise resolving to the mail configuration.
 */
export const fetchMailConfig = () => {
  return Request.get(`/mail/config`); // Make a GET request to fetch mail configuration
};
