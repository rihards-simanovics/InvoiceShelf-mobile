import {getError} from '@/validator';

/**
 * Validate the endpoint URL.
 * @param {object} values - The values to validate.
 * @returns {object} The validation errors.
 */
export const validateEndpoint = (values) => {
  const errors: any = {};

  errors.url = getError(values.url, ['required', 'urlFormat']);

  return errors;
};
