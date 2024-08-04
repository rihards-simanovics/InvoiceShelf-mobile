import {getError} from '@/validator';

/**
 * Validates the preferences form values.
 * @param {Object} values - The form values to validate.
 * @returns {Object} An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {
    time_zone,
    date_format,
    currency,
    language,
    fiscal_year,
    retrospective_edits,
  } = values;

  // Validate each field and assign errors if any
  errors.currency = getError(currency, ['required'], {
    fieldName: 'Currency',
  });

  errors.language = getError(language, ['required'], {
    fieldName: 'Language',
  });
  errors.time_zone = getError(time_zone, ['required']);
  errors.date_format = getError(date_format, ['required']);
  errors.fiscal_year = getError(fiscal_year, ['required']);
  errors.retrospective_edits = getError(retrospective_edits, ['required']);

  return errors;
};

/**
 * Validates the company form values.
 * @param {Object} values - The form values to validate.
 * @returns {Object} An object containing validation errors.
 */
export const validateCompany = (values) => {
  const errors = {};
  // Validate company name and country ID
  errors.name = getError(values.name, ['required']);
  errors.country_id = getError(values.country_id, ['required']);
  errors.currency = getError(values.currency, ['required']);

  return errors;
};
