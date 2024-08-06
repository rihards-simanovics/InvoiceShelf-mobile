import {getError} from '@/validator';

/**
 * Validates tax form values.
 * @param {Object} values - The values to validate.
 * @returns {Object} - An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};

  // Validate the name field
  errors.name = getError(values.name, ['required']);

  // Validate the percent field with custom options
  errors.percent = getError(
    values.percent,
    ['required', 'isNumberFormat', 'maxNumberRequired', 'minNumberRequired'],
    {fieldName: 'Tax Percent', maxNumber: 100, minNumber: -1}
  );

  return errors; // Return the validation errors
};
