import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';

// Selector for accessing the invoice store
const invoiceStore = (state) => state?.invoice;

/**
 * Formats invoice items for display.
 * @param {Array} invoices - The list of invoices.
 * @param {Object} theme - The current theme object.
 * @returns {Array} - The formatted invoice items.
 */
export const formatItems = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }
  return invoices.map((item) => {
    const {
      invoice_number,
      customer: {name, currency} = {},
      status,
      formatted_invoice_date,
      total,
    } = item;
    return {
      title: name,
      subtitle: {
        title: invoice_number,
        labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
        ...(theme.mode === 'dark'
          ? {
              label: capitalize(status),
              labelOutlineColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
            }
          : {
              label: status,
              labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
            }),
      },
      amount: total,
      currency,
      rightSubtitle: formatted_invoice_date,
      fullItem: item,
    };
  });
};

/**
 * Selector for retrieving formatted invoice items.
 */
export const invoicesSelector = createSelector(
  [(state) => state.invoice?.invoices, (state) => state.common?.theme],
  (invoices, theme) => formatItems(invoices, theme)
);

/**
 * Selector for loading states related to invoices.
 */
export const loadingSelector = createSelector(invoiceStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
  isLoading: store?.isLoading,
}));

/**
 * Selector for retrieving invoice templates.
 */
export const templatesSelector = createSelector(
  invoiceStore,
  (store) => store.invoiceTemplates
);
