import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {*} value - The value to set for the spinner.
 * @returns {{type: string, payload: {name: string, value: *}}} - The action object.
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value},
});

/**
 * Action creator for fetching initial expense details.
 * @param {*} payload - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchExpenseInitialDetails = (payload) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload,
});

/**
 * Action creator for fetching expenses.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const fetchExpenses = (payload = {}) => ({
  type: types.FETCH_EXPENSES,
  payload,
});

/**
 * Action creator for fetching a single expense.
 * @param {string} id - The ID of the expense to fetch.
 * @param {function} onSuccess - Callback function to execute on success.
 * @returns {{type: string, payload: {id: string, onSuccess: function}}} - The action object.
 */
export const fetchSingleExpense = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_EXPENSE,
  payload: {id, onSuccess},
});

/**
 * Action creator for adding an expense.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const addExpense = (payload = {}) => ({
  type: types.ADD_EXPENSE,
  payload,
});

/**
 * Action creator for updating an expense.
 * @param {*} [payload={}] - The payload containing necessary data.
 * @returns {{type: string, payload: *}} - The action object.
 */
export const updateExpense = (payload = {}) => ({
  type: types.UPDATE_EXPENSE,
  payload,
});

/**
 * Action creator for removing an expense.
 * @param {string} id - The ID of the expense to remove.
 * @param {*} navigation - The navigation object for routing.
 * @returns {{type: string, payload: {id: string, navigation: *}}} - The action object.
 */
export const removeExpense = (id, navigation) => ({
  type: types.REMOVE_EXPENSE,
  payload: {id, navigation},
});
