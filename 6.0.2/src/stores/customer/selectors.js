import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const customerStore = (state) => state?.customer;

/**
 * Selector for retrieving customers from the state.
 * @param {Object} state - The Redux state.
 * @returns {Array} - The list of formatted customers.
 */
export const customersSelector = createSelector(customerStore, (store) => {
  if (isEmpty(store?.customers)) return [];
  return store.customers.map((customer) => ({
    title: customer?.name,
    subtitle: {title: customer?.contact_name || ''},
    leftAvatar: customer?.name.toUpperCase().charAt(0),
    fullItem: customer,
  }));
});

/**
 * Selector for loading states (saving and deleting).
 * @param {Object} state - The Redux state.
 * @returns {{isSaving: boolean, isDeleting: boolean}} - The loading states.
 */
export const loadingSelector = createSelector(customerStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
