import {getError} from '@/validator';

/**
 * Validates the login form values.
 * @param {Object} values - The values from the login form.
 * @param {string} values.username - The username input.
 * @param {string} values.password - The password input.
 * @returns {Object} An object containing validation errors.
 */
export const loginValidator = (values) => {
  const errors = {};
  const {username, password} = values;

  // Validate username and password fields
  errors.username = getError(username, ['required', 'emailFormat']);
  errors.password = getError(password, ['required', 'minCharacterRequired'], {
    minCharacter: 8,
  });

  return errors;
};

/**
 * Validates the forgot password form values.
 * @param {Object} values - The values from the forgot password form.
 * @param {string} values.email - The email input.
 * @returns {Object} An object containing validation errors.
 */
export const forgotPasswordValidator = (values) => {
  const errors = {};
  const {email} = values;

  // Validate email field
  errors.email = getError(email, ['required', 'emailFormat']);

  return errors;
};
