import {createSelector} from 'reselect';

// Selector to get the user store from the state
const userStore = (state) => state?.user;

/**
 * Selector to get the current user from the user store.
 * @returns {Function} - The selector function.
 */
export const currentUserSelector = createSelector(
  userStore,
  (store) => store.currentUser
);

/**
 * Selector to check if the user is currently saving.
 * @returns {Function} - The selector function.
 */
export const loadingSelector = createSelector(
  userStore,
  (store) => store?.isSaving
);
