/**
 * Selector to get the biometry authentication type from the state.
 * @param {Object} state - The Redux state.
 * @returns {string} The biometry authentication type.
 */
export const biometryTypeSelector = (state) => state?.common?.biometryAuthType;

/**
 * Selector to get the current user's email from the state.
 * @param {Object} state - The Redux state.
 * @returns {string} The current user's email.
 */
export const currentUserEmailSelector = (state) =>
  state?.user?.currentUser?.email;
