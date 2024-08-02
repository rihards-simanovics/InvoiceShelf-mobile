import {findNodeHandle} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

/**
 * Trims whitespace from the beginning and end of string properties in an object.
 * @param {Object} data - The object containing string properties to trim.
 * @returns {Object} - A new object with trimmed string properties.
 */
export const trim = (data) => {
  return Object.keys(data).reduce((accumulator, key) => {
    accumulator[key] =
      typeof data[key] === 'string' ? data[key].trim() : data[key];

    return accumulator;
  }, {});
};

/**
 * Scrolls to the input field within a scroll view.
 * @param {Object} scrollView - The scroll view containing the input field.
 * @param {Object} target - The target input field to scroll to.
 */
export const scrollToInput = ({scrollView}, {target}) => {
  scrollView.scrollToFocusedInput(findNodeHandle(target));
};

/**
 * Picks specified keys from an object and returns a new object with those keys.
 * @param {Object} object - The source object.
 * @param {Array} keys - The keys to pick from the source object.
 * @returns {Object} - A new object with the picked keys.
 */
export const pick = (object = {}, keys = []) => {
  const result = {};

  keys.forEach((key) => {
    result[key] = object[key];
  });

  return result;
};

/**
 * Formats a number as currency.
 * @param {number} amount - The amount to format.
 * @param {Object} [currency] - The currency formatting options.
 * @returns {Object} - An object containing the formatted money string and currency symbol.
 */
export const formatMoney = (amount, currency = 0) => {
  amount = amount / 100;

  if (!currency) {
    currency = {
      precision: 2,
      thousand_separator: ',',
      decimal_separator: '.',
      symbol: '$',
    };
  }

  let {
    precision,
    decimal_separator,
    thousand_separator,
    symbol,
    swap_currency_symbol,
  } = currency;

  try {
    precision = Math.abs(precision);
    precision = isNaN(precision) ? 2 : precision;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(precision))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return {
      symbol,
      money:
        negativeSign +
        (j ? i.substr(0, j) + thousand_separator : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand_separator) +
        (precision
          ? decimal_separator +
            Math.abs(amount - i)
              .toFixed(precision)
              .slice(2)
          : ''),
      swap_currency_symbol,
    };
  } catch (e) {
    // Handle any errors that occur during formatting
  }
};

/**
 * Merges styles based on conditions.
 * @param {Array} styles - An array of style objects with conditions.
 * @returns {Object} - A merged style object.
 */
export const getConditionStyles = (styles) => {
  let commonStyles = {};

  if (typeof styles === 'object' && Array.isArray(styles)) {
    styles
      .filter((v) => !!v && typeof v === 'object')
      .forEach((v) => {
        const {condition, style} = v;

        if (condition) {
          commonStyles = {...commonStyles, ...style};
        } else {
          commonStyles = {...commonStyles, ...v};
        }
      });
  }

  return commonStyles;
};

/**
 * Checks the network connection status.
 * @returns {Promise<boolean>} - A promise that resolves to the connection status.
 */
export const checkConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

/**
 * Capitalizes the first letter of a word.
 * @param {string} word - The word to capitalize.
 * @returns {string} - The capitalized word.
 */
export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
