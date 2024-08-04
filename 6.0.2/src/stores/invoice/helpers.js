import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {INVOICE_ACTIONS} from './types';
import moment from 'moment';

/**
 * Generates action options for editing invoices based on their status and permissions.
 * @param {boolean} [sentStatus=false] - Indicates if the invoice has been sent.
 * @param {boolean} [completeStatus=false] - Indicates if the invoice is complete.
 * @param {boolean} isAllowToEdit - Flag indicating if editing is allowed.
 * @param {boolean} isAllowToDelete - Flag indicating if deletion is allowed.
 * @returns {Array<{label: string, value: string}>} - Array of action options.
 */
export const EDIT_INVOICE_ACTIONS = (
  sentStatus = false,
  completeStatus = false,
  isAllowToEdit,
  isAllowToDelete
) => {
  let options = [];

  // Add options based on invoice status
  if (!sentStatus && !completeStatus) {
    options.push(
      {
        label: t('invoices.actions.send_invoice'),
        value: INVOICE_ACTIONS.SEND,
      },
      {
        label: t('invoices.actions.mark_as_sent'),
        value: INVOICE_ACTIONS.MARK_AS_SENT,
      }
    );
  }

  if (sentStatus) {
    options.push({
      label: t('invoices.actions.resend_invoice'),
      value: INVOICE_ACTIONS.SEND,
    });
  }

  // Add options based on user permissions
  if (PermissionService.isOwner) {
    options.push({
      label: t('invoices.actions.clone'),
      value: INVOICE_ACTIONS.CLONE,
    });
  }

  if (
    PermissionService.isAllowToCreate(routes.MAIN_PAYMENTS) &&
    (sentStatus || (!sentStatus && !completeStatus))
  ) {
    options.push({
      label: t('invoices.actions.record_payment'),
      value: INVOICE_ACTIONS.RECORD_PAYMENT,
    });
  }

  if (isAllowToDelete) {
    options.push({
      label: t('invoices.actions.delete'),
      value: INVOICE_ACTIONS.DELETE,
    });
  }

  // Filter out options if the user is not allowed to send invoices
  if (!PermissionService.isAllowToSend(routes.CREATE_INVOICE)) {
    options = options.filter(
      (o) =>
        o.value !== INVOICE_ACTIONS.SEND &&
        o.value !== INVOICE_ACTIONS.MARK_AS_SENT
    );
  }

  return options;
};

/**
 * Initializes the invoice form values.
 * @param {Array} templates - The list of invoice templates.
 * @returns {Object} - The initial values for the invoice form.
 */
export const initialValues = (templates) => {
  return {
    due_date: moment().add(7, 'days'),
    invoice_date: moment(),
    discount_type: 'fixed',
    discount: 0,
    taxes: [],
    template_name: templates ? templates?.[0]?.name : null,
    notes: null,
    invoice_number: null,
    customer_id: null,
  };
};

/**
 * Determines if the invoice can be edited based on route parameters and permissions.
 * @param {Object} route - The current route object.
 * @param {boolean} isEditScreen - Flag indicating if the current screen is for editing.
 * @param {boolean} hasEditAbility - Flag indicating if the user has edit permissions.
 * @returns {boolean} - True if editing is allowed, false otherwise.
 */
export const isAllowToEditInvoice = (route, isEditScreen, hasEditAbility) => {
  const allow_edit = route?.params?.allow_edit;

  if (!isEditScreen) {
    return true;
  }

  if (!hasEditAbility) {
    return false;
  }

  if (!allow_edit) {
    return false;
  }

  return true;
};
