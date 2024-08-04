import t from 'locales/use-translation';

// Action types for recurring invoices
export const SPINNER = 'recurring/SPINNER';
export const FETCH_INITIAL_DETAILS = 'recurring/FETCH_INITIAL_DETAILS';
export const FETCH_INVOICE_TEMPLATES_SUCCESS =
  'recurring/FETCH_INVOICE_TEMPLATES_SUCCESS';
export const FETCH_NEXT_INVOICE_AT = 'recurring/FETCH_NEXT_INVOICE_AT';
export const CLEAR_RECURRING_INVOICE = 'recurring/CLEAR_RECURRING_INVOICE';
export const CREATE_RECURRING_INVOICE_FORM =
  'recurring/CREATE_RECURRING_INVOICE_FORM';
export const RECURRING_INVOICES_FORM = 'recurring/RECURRING_INVOICES_FORM';
export const FETCH_RECURRING_INVOICES = 'recurring/FETCH_RECURRING_INVOICES';
export const FETCH_RECURRING_INVOICES_SUCCESS =
  'recurring/FETCH_RECURRING_INVOICES_SUCCESS';
export const FETCH_SINGLE_RECURRING_INVOICE =
  'recurring/FETCH_SINGLE_RECURRING_INVOICE';
export const ADD_RECURRING_INVOICE = 'recurring/ADD_RECURRING_INVOICE';
export const ADD_RECURRING_INVOICE_SUCCESS =
  'recurring/ADD_RECURRING_INVOICE_SUCCESS';
export const UPDATE_RECURRING_INVOICE = 'recurring/UPDATE_RECURRING_INVOICE';
export const UPDATE_RECURRING_INVOICE_SUCCESS =
  'recurring/UPDATE_RECURRING_INVOICE_SUCCESS';
export const REMOVE_RECURRING_INVOICE = 'recurring/REMOVE_RECURRING_INVOICE';
export const REMOVE_RECURRING_INVOICE_SUCCESS =
  'recurring/REMOVE_RECURRING_INVOICE_SUCCESS';
export const ADD_RECURRING_INVOICE_ITEM =
  'recurring/ADD_RECURRING_INVOICE_ITEM';
export const ADD_RECURRING_INVOICE_ITEM_SUCCESS =
  'recurring/ADD_RECURRING_INVOICE_ITEM_SUCCESS';
export const REMOVE_RECURRING_INVOICE_ITEM =
  'recurring/REMOVE_RECURRING_INVOICE_ITEM';
export const REMOVE_RECURRING_INVOICE_ITEM_SUCCESS =
  'recurring/REMOVE_RECURRING_INVOICE_ITEM_SUCCESS';

// Constants for recurring invoice tabs and types
export const RECURRING_INVOICES_TABS = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  ALL: 'ALL',
};

export const RECURRING_INVOICES_TYPES = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON HOLD',
  COMPLETED: 'COMPLETED',
};

// Tab names for recurring invoices
export const TAB_NAME = {
  active: t(`recurring_invoices.tabs.active`),
  on_hold: t(`recurring_invoices.tabs.on_hold`),
  all: t(`recurring_invoices.tabs.all`),
};

// Actions for recurring invoices
export const RECURRING_INVOICES_ACTIONS = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

/**
 * Generates dropdown options for recurring invoice actions.
 * @param {boolean} isAllowToEdit - Whether editing is allowed.
 * @param {boolean} isAllowToDelete - Whether deleting is allowed.
 * @returns {Array} - The dropdown options.
 */
export const RECURRING_INVOICE_DROPDOWN = (isAllowToEdit, isAllowToDelete) => {
  const options = [];
  if (isAllowToEdit) {
    options.push({
      label: t('recurring_invoices.dropdown.edit'),
      value: RECURRING_INVOICES_ACTIONS.EDIT,
    });
  }

  if (isAllowToDelete) {
    options.push({
      label: t('recurring_invoices.dropdown.delete'),
      value: RECURRING_INVOICES_ACTIONS.DELETE,
    });
  }
  return options;
};
