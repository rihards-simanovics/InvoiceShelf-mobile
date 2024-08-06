import {hasTextLength as hasValue} from '@/constants';
import {find} from 'lodash';

export const salesTax = 'Sales Tax';

/**
 * Validates if the provided address has all required fields.
 * @param {Object} address - The address object to validate.
 * @returns {boolean} - Returns true if the address is valid, otherwise false.
 */
export const isFullAddress = (address) => {
  const fields = ['address_street_1', 'city', 'state', 'zip'];
  let isValid = true;

  for (const field of fields) {
    if (!hasValue(address[field])) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

export const taxationTypes = {
  CUSTOMER_LEVEL: 'customer_level',
  COMPANY_LEVEL: 'company_level',
};

/**
 * Sets the sales tax field value from the provided values.
 * @param {Object} values - The values containing tax information.
 * @returns {{salesTaxUs: Object|null}} - Returns an object containing the sales tax information or null.
 */
export const setSalesTaxUsFieldValue = (values) => {
  const taxes = values?.taxes ?? [];
  let salesTaxUs = find(taxes, {name: salesTax, type: 'MODULE'});
  salesTaxUs && (salesTaxUs = {...salesTaxUs, id: salesTaxUs.tax_type_id});
  return {salesTaxUs};
};
