import {hasValue, isEmpty} from '@/constants';

/**
 * Filters a list of items based on a search term and specified fields.
 *
 * @param {Object} params - The parameters for the search.
 * @param {Array} params.items - The list of items to search through.
 * @param {string} params.search - The search term to filter items by.
 * @param {Array} params.searchFields - The fields of the items to search within.
 * @returns {Array} - The filtered list of items that match the search term.
 */
export const internalSearch = ({items, search, searchFields}) => {
  // Return an empty array if there are no items to search
  if (isEmpty(items)) {
    return [];
  }

  return items.filter((item) => {
    let filterData = false;

    // Check each search field for a match
    searchFields.filter((field) => {
      let itemField = item?.fullItem ? item.fullItem[field] : item[field];

      // Convert number fields to strings for comparison
      if (typeof itemField === 'number') {
        itemField = itemField.toString();
      }

      // Proceed if the item field has a value
      if (hasValue(itemField)) {
        itemField = itemField.toLowerCase();
        const searchData = search.toString().toLowerCase();

        // Check if the item field contains the search term
        if (itemField.indexOf(searchData) > -1) {
          filterData = true;
        }
      }
    });
    return filterData;
  });
};
