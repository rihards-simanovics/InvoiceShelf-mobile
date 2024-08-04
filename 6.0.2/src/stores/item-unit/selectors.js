import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const unitStore = (state) => state?.itemUnit;

/**
 * Selector for retrieving item-units.
 * @returns {Array} - The list of item-units.
 */
export const unitsSelector = createSelector(unitStore, (store) => {
  if (isEmpty(store.units)) return [];
  return store.units.map((unit) => ({title: unit?.name, fullItem: unit}));
});

/**
 * Selector for loading states (saving and deleting).
 * @returns {{isSaving: boolean, isDeleting: boolean}} - The loading states.
 */
export const loadingSelector = createSelector(unitStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
