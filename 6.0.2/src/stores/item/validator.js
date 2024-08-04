import {validateCustomField} from '@/components';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

/**
 * Validates the item form values.
 * @param {Object} values - The form values to validate.
 * @returns {Object} - The validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {name, quantity, discount_type, price, discount} = values;

  errors.name = getError(name, ['required']);

  errors.quantity = getError(
    quantity,
    ['required', 'minNumberRequired', 'isNumberFormat'],
    {fieldName: 'quantity', minNumber: 0}
  );

  errors.price = getError(
    price,
    ['required', 'minNumberRequired', 'isNumberFormat'],
    {fieldName: 'price', minNumber: 0}
  );

  if (discount_type !== 'none') {
    errors.discount = getError(
      discount,
      ['minNumberRequired', 'isNumberFormat'],
      {fieldName: 'discount', minNumber: 0}
    );
  }

  errors.discount_type = getError(discount_type, ['required']);

  // Uncomment the following lines to enable custom field validation
  // const fieldErrors = validateCustomField(values?.customFields);
  // !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
