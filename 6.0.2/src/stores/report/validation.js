import {getError} from '@/validator';

/**
 * Validates the report generation form values.
 * @param {Object} values - The form values to validate.
 * @param {string} values.from_date - The start date of the report.
 * @param {string} values.to_date - The end date of the report.
 * @param {string} values.date_range - The selected date range.
 * @returns {Object} An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {from_date, to_date, date_range} = values;

  // Validate date range
  errors.date_range = getError(date_range, ['required'], {
    fieldName: 'Date Range',
  });

  // Validate from date
  errors.from_date = getError(from_date, ['required'], {
    fieldName: 'From Date',
  });

  // Validate to date
  errors.to_date = getError(to_date, ['required'], {fieldName: 'To Date'});

  return errors;
};
