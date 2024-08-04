import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {
  ESTIMATE_ACTIONS,
  MARK_AS_ACCEPT,
  MARK_AS_REJECT,
  MARK_AS_SENT,
} from './types';
import moment from 'moment';

/**
 * Generates a list of actions based on the current status of the estimate.
 * @param {string} markAs - The current status of the estimate (e.g., sent, accepted, rejected).
 * @param {boolean} isAllowToEdit - Flag indicating if editing is allowed.
 * @param {boolean} isAllowToDelete - Flag indicating if deletion is allowed.
 * @returns {Array} - An array of action objects.
 */
export const EDIT_ESTIMATE_ACTIONS = (
  markAs = '',
  isAllowToEdit,
  isAllowToDelete
) => {
  const markAsSent = [
    {
      label: t('estimates.actions.mark_as_sent'),
      value: ESTIMATE_ACTIONS.MARK_AS_SENT,
    },
  ];

  const markAsAccept = [
    {
      label: t('estimates.actions.mark_as_accepted'),
      value: ESTIMATE_ACTIONS.MARK_AS_ACCEPTED,
    },
  ];

  const markAsReject = [
    {
      label: t('estimates.actions.mark_as_rejected'),
      value: ESTIMATE_ACTIONS.MARK_AS_REJECTED,
    },
  ];

  const deleteAction = [
    {
      label: t('estimates.actions.delete'),
      value: ESTIMATE_ACTIONS.DELETE,
    },
  ];

  const sendEstimate = {
    label: t(
      markAs === MARK_AS_SENT
        ? 'estimates.actions.resend_estimate'
        : 'estimates.actions.send_estimate'
    ),
    value: ESTIMATE_ACTIONS.SEND,
  };

  let actions = [];

  // Check permissions for viewing invoices
  if (PermissionService.isAllowToView(routes.MAIN_INVOICES)) {
    actions.push({
      label: t('estimates.actions.convert_to_invoice'),
      value: ESTIMATE_ACTIONS.CONVERT_TO_INVOICE,
    });
  }

  // Check permissions for sending estimates
  if (PermissionService.isAllowToSend(routes.CREATE_ESTIMATE)) {
    actions = [...actions, sendEstimate];
  }

  let items = [];

  // Determine available actions based on the current status
  if (markAs === MARK_AS_SENT) {
    items = [...markAsAccept, ...markAsReject];
  } else if (markAs === MARK_AS_ACCEPT) {
    items = [...markAsSent, ...markAsReject];
  } else if (markAs === MARK_AS_REJECT) {
    items = [...markAsSent, ...markAsAccept];
  } else {
    items = [...markAsSent, ...markAsAccept, ...markAsReject];
  }

  // Filter out actions based on permissions
  if (!PermissionService.isAllowToSend(routes.CREATE_ESTIMATE)) {
    items = items.filter((o) => o.value !== ESTIMATE_ACTIONS.MARK_AS_SENT);
  }

  if (!isAllowToEdit) {
    items = items.filter(
      (o) =>
        o.value !== ESTIMATE_ACTIONS.MARK_AS_ACCEPTED &&
        o.value !== ESTIMATE_ACTIONS.MARK_AS_REJECTED
    );
  }

  return isAllowToDelete
    ? [...actions, ...items, ...deleteAction]
    : [...actions, ...items];
};

/**
 * Initializes the default values for a new estimate.
 * @param {Array} templates - The available templates for the estimate.
 * @returns {Object} - The initial values for the estimate.
 */
export const initialValues = (templates) => {
  return {
    expiry_date: moment().add(7, 'days'), // Default expiry date set to 7 days from now
    estimate_date: moment(), // Current date as estimate date
    discount_type: 'fixed', // Default discount type
    discount: 0, // Default discount value
    taxes: [], // Default taxes array
    template_name: templates ? templates?.[0]?.name : null, // First template name or null
    notes: null, // Default notes
    estimate_number: null, // Default estimate number
    customer_id: null, // Default customer ID
  };
};
