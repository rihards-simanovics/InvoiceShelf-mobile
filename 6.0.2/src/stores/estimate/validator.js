import {validateCustomField} from '@/components/custom-field';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

/**
 * Validates the estimate form values.
 * @param {Object} values - The form values to validate.
 * @returns {Object} - An object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {
    estimate_date,
    estimate_number,
    expiry_date,
    template_name,
    items,
    customer_id,
    exchange_rate,
  } = values;

  // Validate required fields
  errors.estimate_date = getError(estimate_date, ['required']);
  errors.expiry_date = getError(expiry_date, ['required']);
  errors.estimate_number = getError(estimate_number, ['required']);
  errors.items = getError(items, ['requiredCheckArray']);
  errors.customer_id = getError(customer_id, ['required'], {
    fieldName: 'Customer',
  });
  errors.template_name = getError(template_name, ['required'], {
    fieldName: 'Template',
  });
  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat',
  ]);

  // Validate custom fields
  const fieldErrors = validateCustomField(values?.customFields);
  if (!isEmpty(fieldErrors)) {
    errors.customFields = fieldErrors;
  }

  return errors;
};
