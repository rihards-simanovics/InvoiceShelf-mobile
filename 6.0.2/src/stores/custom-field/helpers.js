/**
 * Enum for data types used in custom fields.
 * @enum {string}
 */
export const dataTypes = {
  INPUT: 'Input',
  TEXTAREA: 'TextArea',
  PHONE: 'Phone',
  URL: 'Url',
  NUMBER: 'Number',
  DROPDOWN: 'Dropdown',
  SWITCH: 'Switch',
  DATE: 'Date',
  TIME: 'Time',
  DATE_TIME: 'DateTime',
};

/**
 * Enum for modal types used in the application.
 * @enum {string}
 */
export const modalTypes = {
  CUSTOMER: 'Customer',
  INVOICE: 'Invoice',
  ESTIMATE: 'Estimate',
  EXPENSE: 'Expense',
  PAYMENT: 'Payment',
  // ITEM: 'Item' // Uncomment if needed
};

/**
 * List of data types for selection.
 * @type {Array<{label: string, value: string}>}
 */
export const dataTypeList = [
  {label: 'Text', value: dataTypes.INPUT},
  {label: 'Textarea', value: dataTypes.TEXTAREA},
  {label: 'Phone', value: dataTypes.PHONE},
  {label: 'URL', value: dataTypes.URL},
  {label: 'Number', value: dataTypes.NUMBER},
  {label: 'Select Field', value: dataTypes.DROPDOWN},
  {label: 'Switch Toggle', value: dataTypes.SWITCH},
  {label: 'Date', value: dataTypes.DATE},
  {label: 'Time', value: dataTypes.TIME},
  {label: 'Date & Time', value: dataTypes.DATE_TIME},
];

/**
 * List of modal types for selection.
 * @type {Array<{label: string, value: string}>}
 */
export const modalTypeList = [
  {label: 'Customer', value: modalTypes.CUSTOMER},
  {label: 'Invoice', value: modalTypes.INVOICE},
  {label: 'Estimate', value: modalTypes.ESTIMATE},
  {label: 'Expense', value: modalTypes.EXPENSE},
  {label: 'Payment', value: modalTypes.PAYMENT},
  // {label: 'Item', value: modalTypes.ITEM} // Uncomment if needed
];
