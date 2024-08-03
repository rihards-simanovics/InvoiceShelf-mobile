import {Appearance} from 'react-native-appearance';
import {store} from '@/stores';

/**
 * Constants representing system appearance color options.
 */
export const SYSTEM_APPEARANCE_COLOR = {
  LIGHT: 'light',
  DARK: 'dark',
  NO_PREFERENCE: 'no-preference',
};

/**
 * Checks if the current system appearance is set to dark mode.
 *
 * @returns {boolean} - Returns true if dark mode is enabled, otherwise false.
 */
export const isDarkMode = () => {
  try {
    const color = Appearance.getColorScheme();
    return color === SYSTEM_APPEARANCE_COLOR.DARK;
  } catch (e) {
    // If an error occurs while getting the color scheme, default to false
    return false;
  }
};

/**
 * Constants representing the status bar content based on the appearance mode.
 */
export const STATUS_BAR_CONTENT = {
  light: 'dark-content',
  dark: 'light-content',
};

/**
 * The current theme from the store's common state.
 *
 * @constant {string|undefined} - The theme value, or undefined if not set.
 */
export const THEME = store?.getState?.()?.common?.theme;
