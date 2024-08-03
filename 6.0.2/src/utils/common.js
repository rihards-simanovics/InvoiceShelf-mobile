import {isNaN, omit, sortBy} from 'lodash';
import {hasObjectLength, hasValue} from '@/constants';
import {I18nManager} from 'react-native';
import {calculationRefs} from '@/stores/common/helpers';

/**
 * Checks if any filters are applied based on the provided form values.
 *
 * @param {Object} formValues - The form values to check.
 * @returns {boolean} - Returns true if filters are applied, otherwise false.
 */
export const isFilterApply = (formValues) => {
  if (!formValues) return false;

  const values = omit(formValues, 'search');
  return hasObjectLength(values);
};

/**
 * Sorts an array of items based on a specified iteratee.
 *
 * @param {Array} items - The array of items to sort.
 * @param {Function|string} iteratee - The iteratee to sort by (can be a function or property name).
 * @returns {Array} - The sorted array of items.
 */
export const sortByItem = (items, iteratee) => {
  return sortBy(items, [iteratee]);
};

/**
 * Checks if the current layout direction is right-to-left (RTL).
 *
 * @returns {boolean} - Returns true if the layout is RTL, otherwise false.
 */
export const isRTL = () => I18nManager.isRTL;

/**
 * Calculates the amount based on the exchange rate and whether to add or subtract.
 *
 * @param {number} price - The original price to convert.
 * @param {boolean} itemAdd - If true, multiplies the price by the exchange rate; if false, divides it.
 * @returns {number} - The converted amount based on the exchange rate, or the original price if conversion fails.
 */
export const withExchangedAmount = (price, itemAdd) => {
  let rate = calculationRefs?.exchangeRate?.();
  let rateAmount = rate;
  let finalAmount = price;

  if (!hasValue(rate)) {
    return price;
  }

  if (typeof rate === 'string') {
    rateAmount = parseFloat(rate);
  }

  if (itemAdd) {
    finalAmount = price * rateAmount;
  } else {
    finalAmount = price / rateAmount;
  }

  if (isNaN(finalAmount)) {
    return price;
  }

  return finalAmount;
};

/**
 * Sets the I18nManager value for right-to-left (RTL) layout.
 *
 * @param {Object} params - The parameters for setting the I18nManager value.
 * @param {boolean} params.isRTL - Indicates whether to set the layout to RTL.
 * @returns {Promise<void>} - A promise that resolves when the I18nManager value is set.
 */
export const setI18nManagerValue = async ({isRTL}) => {
  try {
    await I18nManager.forceRTL(isRTL);
    await I18nManager.allowRTL(isRTL);
  } catch (e) {
    // Handle error silently
  }
};
