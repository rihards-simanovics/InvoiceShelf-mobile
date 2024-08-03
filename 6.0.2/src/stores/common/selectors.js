import {createSelector} from 'reselect';
import {PermissionService} from '@/services';
import {isEmpty} from '@/constants';

// Selector to get the common store state
const commonStore = (state) => state?.common;

/**
 * Selector to get permission details based on the route.
 * @param {object} route - The route object containing parameters.
 * @returns {object} The permission details.
 */
export const permissionSelector = (route) => {
  const type = route?.params?.type ?? 'ADD';
  const id = route?.params?.id;
  const isEditScreen = type === 'UPDATE';
  const isAllowToEdit = isEditScreen
    ? PermissionService.isAllowToEdit(route?.name)
    : true;
  const isAllowToDelete = isEditScreen
    ? PermissionService.isAllowToDelete(route?.name)
    : true;

  return {
    id,
    type,
    isCreateScreen: !isEditScreen,
    isEditScreen,
    isAllowToEdit,
    isAllowToDelete,
  };
};

/**
 * Selector to get common state details.
 * @param {object} state - The Redux state.
 * @returns {object} The common state details.
 */
export const commonSelector = (state) => {
  const {common, user} = state;
  return {
    locale: common?.locale,
    theme: common?.theme,
    abilities: user?.currentAbilities,
  };
};

/**
 * Selector to get settings related to discounts and taxes.
 * @param {object} state - The Redux state.
 * @returns {object} The settings details.
 */
export const settingsSelector = (state) => {
  const {
    common: {discount_per_item, tax_per_item},
  } = state;
  return {
    discount_per_item,
    tax_per_item,
  };
};

/**
 * Selector to get the list of countries.
 * @returns {function} The selector function.
 */
export const countriesSelector = createSelector(commonStore, (store) => {
  if (isEmpty(store?.countries)) return [];
  return store.countries.map((country) => ({
    title: country.name,
    rightTitle: country.code,
    fullItem: country,
  }));
});
