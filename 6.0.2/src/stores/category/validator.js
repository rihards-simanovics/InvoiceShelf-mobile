import {getError} from '@/validator';

/**
 * Validates the category form values.
 * @param {Object} values - The values from the category form.
 * @param {string} values.name - The name of the category.
 * @returns {Object} An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};

  // Validate the name field
  errors.name = getError(values?.name, ['required']);

  return errors;
};
