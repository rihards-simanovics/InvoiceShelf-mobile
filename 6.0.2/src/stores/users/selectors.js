import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const usersStore = (state) => state?.users;
const roleStore = (state) => state?.role;

/**
 * Selector for retrieving formatted user data.
 * @returns {Array} - The formatted user data.
 */
export const usersSelector = createSelector(usersStore, (store) => {
  if (isEmpty(store.users)) return [];
  return store.users.map((user) => ({
    title: user?.name,
    subtitle: {title: user?.email || ''},
    fullItem: user,
    leftAvatar: user?.name.toUpperCase().charAt(0),
  }));
});

/**
 * Selector for retrieving roles.
 * @returns {Array} - The roles data.
 */
export const rolesSelector = createSelector(roleStore, (store) => store?.roles);

/**
 * Selector for loading states.
 * @returns {{isSaving: boolean, isDeleting: boolean}} - The loading states.
 */
export const loadingSelector = createSelector(usersStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
