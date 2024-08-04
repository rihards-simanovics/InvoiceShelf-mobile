import {isEmpty} from '@/constants';
import {getError} from '@/validator';
import {validateCustomField} from '@/components/custom-field';

/**
 * Validates the invoice form values.
 * @param {Object} values - The values of the invoice form to validate.
 * @returns {Object} An object containing validation errors, if any.
 */
export const validate = (values) => {
  const errors: any = {};
  const {
    invoice_number,
    customer_id,
    items,
    template_name,
    invoice_date,
    due_date,
    exchange_rate,
  } = values;

  // Validate required fields and format
  errors.invoice_number = getError(invoice_number, ['required']);
  errors.customer_id = getError(customer_id, ['required']);
  errors.items = getError(items, ['requiredCheckArray']);
  errors.template_name = getError(template_name, ['required']);
  errors.invoice_date = getError(invoice_date, ['required']);
  errors.due_date = getError(due_date, ['required']);
  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat',
  ]);

  // Validate custom fields if any
  const fieldErrors = validateCustomField(values?.customFields);
  if (!isEmpty(fieldErrors)) {
    errors.customFields = fieldErrors;
  }

  return errors;
};
