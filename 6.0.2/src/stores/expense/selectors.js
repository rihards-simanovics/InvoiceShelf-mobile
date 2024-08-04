import {isEmpty} from '@/constants';
import {createSelector} from 'reselect';

/**
 * Formats expense items for display.
 * @param {Array} expenses - The list of expenses.
 * @param {string} currency - The currency to display.
 * @returns {Array} - The formatted expense items.
 */
const formatExpenseItems = (expenses, currency) => {
  if (isEmpty(expenses)) {
    return [];
  }
  return expenses.map((expense) => {
    const {customer, formatted_expense_date, amount, expense_category} =
      expense;

    return {
      title: expense_category.name
        ? expense_category.name[0].toUpperCase() +
          expense_category.name.slice(1)
        : '',
      subtitle: {title: customer?.name},
      amount,
      currency,
      rightSubtitle: formatted_expense_date,
      fullItem: expense,
    };
  });
};

/**
 * Selector for retrieving formatted expense items.
 */
export const expenseSelector = createSelector(
  [
    (state) => state?.expense?.expenses,
    (state) => state?.company?.selectedCompanyCurrency,
  ],
  (expenses, currency) => formatExpenseItems(expenses, currency)
);

/**
 * Selector for loading states related to expenses.
 */
export const loadingSelector = createSelector(
  (state) => state?.expense,
  (store) => ({
    isSaving: store?.isSaving,
    isDeleting: store?.isDeleting,
    isLoading: store?.isLoading,
  })
);
