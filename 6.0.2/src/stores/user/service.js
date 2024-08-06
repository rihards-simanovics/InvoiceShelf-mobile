import Request from 'utils/request';

/**
 * Fetch the current user from the API.
 * @returns {Promise<Object>} - The promise resolving to the user data.
 */
export const fetchCurrentUser = () => {
  return Request.get(`/me`);
};

/**
 * Update the current user with the provided data.
 * @param {Object} data - The data to update the user with.
 * @returns {Promise<Object>} - The promise resolving to the updated user data.
 */
export const updateCurrentUser = (data) => {
  return Request.put(`/me`, data);
};

/**
 * Fetch user settings based on the provided keys.
 * @param {Array<string>} keys - The keys of the settings to fetch.
 * @returns {Promise<Object>} - The promise resolving to the user settings.
 */
export const fetchUserSettings = (keys) => {
  return Request.get(`/me/settings`, {axiosProps: {params: {settings: keys}}});
};

/**
 * Update user settings with the provided settings.
 * @param {Object} settings - The settings to update.
 * @returns {Promise<Object>} - The promise resolving to the updated settings.
 */
export const updateUserSettings = (settings) => {
  return Request.put(`/me/settings`, {settings});
};

/**
 * Upload the user's avatar.
 * @param {File} avatar - The avatar file to upload.
 * @returns {Promise<Object>} - The promise resolving to the upload response.
 */
export const uploadAvatar = (avatar) => {
  return Request.post(
    `/me/upload-avatar`,
    {},
    {image: avatar, imageName: 'avatar'}
  );
};
