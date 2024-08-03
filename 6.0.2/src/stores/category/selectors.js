import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

// Selector to get the category store from the state
const categoryStore = (state) => state?.category;

/**
 * Selector to get formatted categories from the state.
 * @returns {Array<Object>} An array of formatted category objects.
 */
export const categoriesSelector = createSelector(categoryStore, (store) => {
  if (isEmpty(store?.categories)) return [];
  return store.categories.map((category) => ({
    title: category.name,
    subtitle: {title: category.description},
    fullItem: category,
  }));
});

/**
 * Selector to get loading states for saving and deleting categories.
 * @returns {Object} An object containing loading states.
 */
export const loadingSelector = createSelector(categoryStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
