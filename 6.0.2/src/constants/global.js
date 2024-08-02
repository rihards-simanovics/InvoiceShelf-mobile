import {Alert} from 'react-native';

export const MAX_LENGTH = 255;

/**
 * Displays an alert dialog.
 * @param {Object} options - The options for the alert.
 * @param {string} options.title - The title of the alert.
 * @param {string} options.desc - The description of the alert.
 * @param {string} options.okText - The text for the OK button.
 * @param {Function} options.okPress - The function to call when OK is pressed.
 * @param {boolean} options.showCancel - Whether to show the cancel button.
 * @param {string} options.cancelText - The text for the cancel button.
 * @param {Function} options.cancelPress - The function to call when cancel is pressed.
 * @param {boolean} options.autoClose - Whether the alert is cancelable.
 */
export const alertMe = ({
  title = '',
  desc = '',
  okText = 'OK',
  okPress = null,
  showCancel = false,
  cancelText = 'Cancel',
  cancelPress = null,
  autoClose = true,
}) => {
  const cancelEvent = {
    text: cancelText,
    onPress: cancelPress ? cancelPress : () => {},
    style: 'cancel',
  };

  let events = [
    {
      text: okText,
      onPress: okPress ? okPress : () => {},
    },
  ];

  if (showCancel || cancelPress) events = [...events, cancelEvent];

  Alert.alert(title, desc, events, {cancelable: autoClose});
};

/**
 * Checks if a field has a value.
 * @param {*} field - The field to check.
 * @returns {boolean} - True if the field has a value, false otherwise.
 */
export const hasValue = (field) => {
  return field !== null && typeof field !== 'undefined';
};

/**
 * Checks if a field has a length property and is not empty.
 * @param {*} field - The field to check.
 * @returns {boolean} - True if the field has a length property and is not empty, false otherwise.
 */
export const hasLength = (field) => {
  return field && field.length !== 0 && typeof field === 'object';
};

/**
 * Checks if a field is an array and has a length.
 * @param {*} fields - The field to check.
 * @returns {boolean} - True if the field is an array and has a length, false otherwise.
 */
export const isArray = (fields) => hasValue(fields) && hasLength(fields);

/**
 * Checks if a field is empty.
 * @param {*} fields - The field to check.
 * @returns {boolean} - True if the field is empty, false otherwise.
 */
export const isEmpty = (fields) => !hasValue(fields) || !hasLength(fields);

/**
 * Checks if an object has keys.
 * @param {Object} field - The object to check.
 * @returns {boolean} - True if the object has keys, false otherwise.
 */
export const hasObjectLength = (field) => {
  return field && Object.keys(field).length !== 0;
};

/**
 * Checks if a value is boolean true.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is boolean true, false otherwise.
 */
export const isBooleanTrue = (value) =>
  value && (value === 'YES' || value === 1 || value === true);

/**
 * Checks if a string has a length.
 * @param {string} string - The string to check.
 * @returns {boolean} - True if the string has a length, false otherwise.
 */
export const hasTextLength = (string) => {
  return hasValue(string) && string.length !== 0;
};

/**
 * Converts an array to an object.
 * @param {Array} arr - The array to convert.
 * @returns {Object} - The converted object.
 */
export function toObject(arr) {
  if (isEmpty(arr)) {
    return {};
  }

  let output = {};

  const objects = Object.assign({}, arr);
  for (const key in objects) {
    output = {...objects[key]};
  }

  return output;
}

/**
 * Creates a hitSlop object for touchable components.
 * @param {number} top - The top hitSlop value.
 * @param {number} left - The left hitSlop value.
 * @param {number} bottom - The bottom hitSlop value.
 * @param {number} right - The right hitSlop value.
 * @returns {Object} - The hitSlop object.
 */
export const hitSlop = (top, left, bottom, right) => ({
  top,
  left,
  bottom,
  right,
});
