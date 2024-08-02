import {Dimensions} from 'react-native';
import {isIPhoneX} from './platform';

/**
 * The width of the device screen.
 * @type {number}
 */
export const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * The height of the device screen.
 * @type {number}
 */
export const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Returns a size parameter based on whether the device is an iPhone X or not.
 * @param {any} large - The parameter for large size (iPhone X).
 * @param {any} normal - The parameter for normal size.
 * @returns {any} The parameter for the current device size.
 */
export const defineLargeSizeParam = (large, normal) =>
  isIPhoneX() ? large : normal;

/**
 * Indicates if the screen height is considered major (800 or more).
 * @type {boolean}
 */
export const isMajorScreenHeight = SCREEN_HEIGHT >= 800;

/**
 * Indicates if the screen width is considered very small (340 or less).
 * @type {boolean}
 */
export const isVerySmallScreen = SCREEN_WIDTH <= 340;

/**
 * Returns a size parameter based on the device's screen size.
 * @param {any} small - The parameter for small size.
 * @param {any} medium - The parameter for medium size.
 * @param {any} large - The parameter for large size.
 * @param {any} extraLarge - The parameter for extra large size (iPhone X).
 * @returns {any} The parameter for the current screen size.
 */
export const defineSize = (small, medium, large, extraLarge) => {
  if (isIPhoneX()) {
    return extraLarge;
  }

  if (isMajorScreenHeight) {
    return large;
  }

  if (isVerySmallScreen) {
    return small;
  }

  return medium;
};
