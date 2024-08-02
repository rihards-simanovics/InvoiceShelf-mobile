import {Keyboard} from 'react-native';

/**
 * Dismisses the keyboard.
 */
export function dismissKeyboard() {
  Keyboard.dismiss();
}

/**
 * Enum for different types of keyboard inputs.
 * @enum {string}
 */
export const keyboardType = {
  DEFAULT: 'default', // Standard keyboard
  NUMERIC: 'numeric', // Numeric keyboard
  DECIMAL: 'decimal-pad', // Keyboard with decimal point
  EMAIL: 'email-address', // Keyboard optimized for email input
  PHONE: 'phone-pad', // Keyboard optimized for phone number input
  URL: 'url', // Keyboard optimized for URL input
};

/**
 * Enum for different types of return key options on the keyboard.
 * @enum {string}
 */
export const keyboardReturnKeyType = {
  DEFAULT: 'default', // Standard return key
  GO: 'go', // Go action
  GOOGLE: 'google', // Google search action
  NEXT: 'next', // Move to next input field
  SEARCH: 'search', // Search action
  SEND: 'send', // Send action
  DONE: 'done', // Done action
};
