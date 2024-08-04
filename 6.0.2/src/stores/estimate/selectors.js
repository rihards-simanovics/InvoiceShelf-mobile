import {createSelector} from 'reselect';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';
import {capitalize, isEmpty} from '@/constants';

// Selector to access the estimate store from the global state
const estimateStore = (state) => state?.estimate;

/**
 * Formats estimate items for display.
 * @param {Array} estimates - The array of estimates to format.
 * @param {Object} theme - The current theme object.
 * @returns {Array} - The formatted estimate items.
 */
export const formatEstimateItems = (estimates, theme) => {
  if (isEmpty(estimates)) {
    return [];
  }
  return estimates.map((item) => {
    const {
      estimate_number,
      customer: {name, currency} = {},
      status,
      formatted_estimate_date,
      total,
    } = item;

    return {
      title: name,
      subtitle: {
        title: estimate_number,
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
      rightSubtitle: formatted_estimate_date,
      fullItem: item,
    };
  });
};

/**
 * Selector to get formatted estimate items from the state.
 * @returns {Array} - The formatted estimate items.
 */
export const estimateSelector = createSelector(
  [(state) => state.estimate.estimates, (state) => state.common?.theme],
  (estimates, theme) => formatEstimateItems(estimates, theme)
);

/**
 * Selector to get loading states from the estimate store.
 * @returns {Object} - The loading states.
 */
export const loadingSelector = createSelector(estimateStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
  isLoading: store?.isLoading,
}));

/**
 * Selector to get estimate templates from the estimate store.
 * @returns {Array} - The estimate templates.
 */
export const templatesSelector = createSelector(
  estimateStore,
  (store) => store.estimateTemplates
);
