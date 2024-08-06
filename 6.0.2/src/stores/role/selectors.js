import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {isEmpty} from '@/constants';

// Selector to access the role store
const roleStore = (state) => state?.role;

/**
 * Selector to get formatted roles.
 * @returns {Array<Object>} An array of formatted roles.
 */
export const rolesSelector = createSelector(roleStore, (store) => {
  if (isEmpty(store?.roles)) return [];
  return store?.roles.map((role) => ({title: role.name, fullItem: role}));
});

/**
 * Selector to get permissions from the role store.
 * @returns {Array<Object>} An array of permissions.
 */
export const permissionsSelector = (state) => roleStore(state)?.permissions;

/**
 * Selector to get formatted permissions grouped by model name.
 * @returns {Object} An object of permissions grouped by model name.
 */
export const formattedPermissionsSelector = (state) =>
  groupBy(roleStore(state)?.permissions ?? [], 'modelName');

/**
 * Selector to get loading states for saving and deleting.
 * @returns {Object} An object containing loading states.
 */
export const loadingSelector = createSelector(roleStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
