import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

// Selector to get the payment mode store from the state.
const modeStore = (state) => state?.paymentMode;

/**
 * Selector to get the formatted modes.
 * @returns {Array<Object>} The formatted modes.
 */
export const modesSelector = createSelector(modeStore, (store) => {
  if (isEmpty(store?.modes)) return [];
  return store.modes.map((mode) => ({title: mode?.name, fullItem: mode}));
});

/**
 * Selector to get the loading state.
 * @returns {Object} The loading state.
 */
export const loadingSelector = createSelector(modeStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
