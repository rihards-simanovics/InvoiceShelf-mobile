import {getError} from '@/validator';

/**
 * Validates the role form values.
 * @param {Object} values - The form values to validate.
 * @param {string} values.name - The name of the role.
 * @returns {Object} An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {name} = values;

  errors.name = getError(name, ['required']);

  return errors;
};
