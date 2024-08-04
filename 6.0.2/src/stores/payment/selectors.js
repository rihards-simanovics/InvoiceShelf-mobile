import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';

const paymentStore = (state) => state?.payment;

/**
 * Selector to get formatted payments.
 * @returns {Array} The formatted payments.
 */
export const paymentsSelector = createSelector(paymentStore, (store) => {
  if (isEmpty(store?.payments)) return [];
  return store.payments.map((payment) => {
    const {formatted_payment_date, amount, payment_number, customer, currency} =
      payment;

    return {
      title: customer?.name ?? '',
      subtitle: {title: payment_number ?? ''},
      amount,
      currency,
      rightSubtitle: formatted_payment_date,
      fullItem: payment,
    };
  });
});

/**
 * Helper function to format invoices.
 * @param {Array} paymentInvoices - The list of payment invoices.
 * @param {string} paymentInvoiceId - The ID of the payment invoice.
 * @param {Object} theme - The current theme.
 * @returns {Array} The formatted invoices.
 */
const formattedInvoice = (paymentInvoices, paymentInvoiceId, theme) => {
  if (isEmpty(paymentInvoices)) return [];
  return paymentInvoices.map((invoice) => {
    const {
      status,
      invoice_number,
      formatted_due_date,
      due_amount,
      total,
      customer,
      id,
    } = invoice;

    if (due_amount > 0 || id === paymentInvoiceId) {
      return {
        title: customer?.name,
        subtitle: {
          title: invoice_number,
          labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
          ...(theme.mode === 'dark'
            ? {
                label: capitalize(status),
                labelOutlineColor:
                  BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
              }
            : {
                label: status,
                labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
              }),
        },
        amount: total,
        currency: customer?.currency,
        rightSubtitle: formatted_due_date,
        fullItem: invoice,
      };
    }
  });
};

/**
 * Selector to get formatted payment invoices.
 * @param {Array} invoices - The list of invoices.
 * @param {string} paymentInvoiceId - The ID of the payment invoice.
 * @param {Object} theme - The current theme.
 * @returns {Array} The formatted payment invoices.
 */
export const paymentInvoicesSelector = (invoices, paymentInvoiceId, theme) =>
  formattedInvoice(invoices, paymentInvoiceId, theme);

/**
 * Selector to get loading states.
 * @returns {Object} The loading states.
 */
export const loadingSelector = createSelector(paymentStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
