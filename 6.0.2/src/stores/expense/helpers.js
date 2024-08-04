import t from 'locales/use-translation';
import moment from 'moment';

// Constants for action values
export const ACTIONS_VALUE = {
  REMOVE: 'remove',
  DOWNLOAD: 'download',
};

/**
 * Generates action options for expenses based on the provided image URL and deletion permission.
 * @param {string} [imageUrl=''] - The URL of the image.
 * @param {boolean} isAllowToDelete - Flag indicating if deletion is allowed.
 * @returns {Array<{label: string, value: string}>} - Array of action options.
 */
export const EXPENSE_ACTIONS = (imageUrl = '', isAllowToDelete) => {
  const options = [];

  if (imageUrl) {
    options.push({
      label: t('expenses.view_receipt'),
      value: ACTIONS_VALUE.DOWNLOAD,
    });
  }

  if (isAllowToDelete) {
    options.push({
      label: t('expenses.remove_expense'),
      value: ACTIONS_VALUE.REMOVE,
    });
  }

  return options;
};
