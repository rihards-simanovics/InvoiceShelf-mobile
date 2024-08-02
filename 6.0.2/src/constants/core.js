/**
 * Button color constants used throughout the application.
 */
export const BUTTON_COLOR = {
  PRIMARY: 'primary',
  PRIMARY_LIGHT: 'primaryLight',
  SUCCESS: 'success',
  SUCCESS_LIGHT: 'successLight',
  SUCCESS_DARK: 'successDark',
  INFO: 'info',
  DANGER: 'danger',
  DANGER_LIGHT: 'dangerLight',
  DANGER_DARK: 'dangerDark',
  WARNING: 'warning',
  WARNING_LIGHT: 'warningLight',
  WARNING_DARK: 'warningDark',
  DARK: 'dark',
  DARK2: 'dark2',
  DARK3: 'dark3',
  VERY_LIGHT_GRAY: 'veryLightGray',
  LIGHT_GRAY: 'lightGray',
  DARK_GRAY: 'darkGray',
  VERY_DARK_GRAY: 'veryDarkGray',
  PINK: 'pink',
  LIGHT_GREEN: 'lightGreen',
  WHITE: 'white',
};

/**
 * Date format used throughout the application.
 * @type {string}
 */
export const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Time format used throughout the application.
 * @type {string}
 */
export const TIME_FORMAT = 'HH:mm';

/**
 * Time format with meridiem used throughout the application.
 * @type {string}
 */
export const TIME_FORMAT_MERIDIEM = 'hh:mm A';

/**
 * Action type for switching themes.
 * @type {string}
 */
export const SWITCH_THEME = 'SWITCH_THEME';

/**
 * Biometry authentication types.
 */
export const BIOMETRY_AUTH_TYPES = {
  FINGERPRINT: 'FINGERPRINT',
  FACE: 'FACE',
};

/**
 * Action creator for switching themes.
 * @param {Object} payload - The payload for the action.
 * @returns {Object} - The action object.
 */
export const switchTheme = (payload = {}) => ({
  type: SWITCH_THEME,
  payload,
});
