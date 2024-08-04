import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

/**
 * Formats items for display.
 * @param {Array} items - The array of items to format.
 * @returns {Array} - The formatted items.
 */
const formattedItems = (items) =>
  items.map((item) => {
    const {name, description, price, title, currency} = item;
    return {
      title: title ?? name ?? '',
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item,
    };
  });

/**
 * Selector for getting formatted items from the state.
 * @type {Function}
 */
export const itemsSelector = createSelector(
  (state) => state?.item?.items,
  (items) => (!isEmpty(items) ? formattedItems(items) : [])
);

/**
 * Selector for loading state.
 * @type {Function}
 */
export const loadingSelector = createSelector(
  (state) => state?.item,
  (store) => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
