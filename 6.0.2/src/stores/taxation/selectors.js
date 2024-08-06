import {createSelector} from 'reselect';

const taxationStore = (state) => state?.taxation;

/**
 * Selector to get the loading state of the taxation store.
 * @returns {boolean} - Returns true if the store is saving, otherwise false.
 */
export const loadingSelector = createSelector(
  taxationStore,
  (store) => store?.isSaving
);
