import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

// Selector to access the taxType store
const taxTypeStore = (state) => state?.taxType;

/**
 * Formats a tax object for display.
 * @param {Object} tax - The tax object to format.
 * @returns {Object} - The formatted tax object.
 */
export const formatTaxType = (tax) => ({
  title: tax.name,
  subtitle: {title: tax.description},
  rightTitle: `${tax.percent} %`,
  fullItem: tax,
});

/**
 * Selector to get formatted tax types.
 * @returns {Array} - An array of formatted tax types.
 */
export const taxTypesSelector = createSelector(taxTypeStore, (store) => {
  if (isEmpty(store?.taxTypes)) return [];
  return store.taxTypes.map((tax) => formatTaxType(tax)); // Format each tax type
});

/**
 * Selector to get loading states for saving and deleting.
 * @returns {Object} - An object containing loading states.
 */
export const loadingSelector = createSelector(taxTypeStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
