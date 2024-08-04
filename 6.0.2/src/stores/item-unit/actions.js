import * as types from './types';

/**
 * Action creator for setting the spinner state.
 * @param {string} name - The name of the spinner.
 * @param {boolean} value - The value of the spinner (true/false).
 * @returns {{type: string, payload: {name: string, value: boolean}}} - The action object.
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value},
  };
}

/**
 * Action creator for fetching the item-units list.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const fetchItemUnits = (payload = {}) => ({
  type: types.FETCH_ITEM_UNITS,
  payload,
});

/**
 * Action creator for adding an item-unit.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const addItemUnit = (payload = {}) => ({
  type: types.ADD_ITEM_UNIT,
  payload,
});

/**
 * Action creator for updating an item-unit.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const updateItemUnit = (payload = {}) => ({
  type: types.UPDATE_ITEM_UNIT,
  payload,
});

/**
 * Action creator for deleting an item-unit.
 * @param {Object} payload - The payload for the action.
 * @returns {{type: string, payload: Object}} - The action object.
 */
export const removeItemUnit = (payload = {}) => ({
  type: types.REMOVE_ITEM_UNIT,
  payload,
});
