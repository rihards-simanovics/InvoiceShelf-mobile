import {getError} from '@/validator';

/**
 * Validate note form values.
 * @param {Object} values - The form values to validate.
 * @returns {Object} - An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};

  errors.name = getError(values?.name, ['required']);
  errors.type = getError(values?.type, ['required']);
  errors.notes = getError(values?.notes, ['required']);

  return errors;
};
