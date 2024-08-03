import {trim} from 'lodash';
import {
  EMAIL_REGEX,
  URL_REGEX,
  CHARACTER_ONLY_REGEX,
  CRON_REGEX,
} from './regex';

/**
 * Options for validation.
 */
type IValidationOptions = {
  /**The name of the field being validated. */
  fieldName?: string,
  /**The minimum number allowed. */
  minNumber?: number,
  /**The maximum number allowed. */
  maxNumber?: number,
  /**The maximum number of characters allowed. */
  maxCharacter?: number | string,
  /**The minimum number of characters required. */
  minCharacter?: number | string,
  /**Custom error message. */
  message?: string,
};

/**
 * Types of validation errors.
 */
type ErrorType =
  | 'emailFormat'
  | 'required'
  | 'itemField'
  | 'requiredCheckArray'
  | 'minNumberRequired'
  | 'maxNumberRequired'
  | 'maxCharacterRequired'
  | 'minCharacterRequired'
  | 'characterOnlyRequired'
  | 'isNumberFormat'
  | 'passwordCompared'
  | 'moreThanDue'
  | 'urlFormat'
  | 'cronFormat';

/**
 * Validates a value against specified error types and options.
 *
 * @param {string | number | any} value - The value to validate.
 * @param {Array<ErrorType>} errorTypes - The types of errors to check for.
 * @param {IValidationOptions} [options={}] - Optional validation options.
 * @returns {string|null} - Returns the error message if validation fails, otherwise null.
 */
export function getError(
  value: string | number | any,
  errorTypes: Array<ErrorType>,
  options: IValidationOptions = {}
) {
  const {
    fieldName,
    minNumber,
    maxNumber,
    maxCharacter,
    minCharacter,
    message = null,
  } = options;

  // Mapping of error types to validation functions
  const errorTypeMap = {
    emailFormat: () => (EMAIL_REGEX.test(value) ? null : 'validation.email'),

    required: () => (!trim(value) ? 'validation.required' : null),

    itemField: () => (!value ? 'validation.choose' : null),

    requiredCheckArray: () =>
      value && value.length ? null : message ?? 'validation.choose',

    minNumberRequired: () =>
      value <= minNumber ? 'validation.minimum_number' : null,

    maxNumberRequired: () =>
      value > maxNumber ? 'validation.maximum_number' : null,

    maxCharacterRequired: () =>
      value.length > maxCharacter ? 'validation.maximum_character' : null,

    minCharacterRequired: () => {
      if (value) {
        return value.length < minCharacter
          ? message || 'validation.min_character'
          : null;
      }
    },

    characterOnlyRequired: () =>
      CHARACTER_ONLY_REGEX.test(value) ? null : 'validation.character',

    isNumberFormat: () => (isNaN(Number(value)) ? 'validation.numeric' : null),

    passwordCompared: () =>
      value
        ? value === fieldName
          ? null
          : 'validation.password_compare'
        : fieldName
        ? value === fieldName
          ? null
          : 'validation.password_compare'
        : null,

    moreThanDue: () => 'validation.more_than_due',

    urlFormat: () => (URL_REGEX.test(value) ? null : 'validation.url'),

    cronFormat: () => (CRON_REGEX.test(value) ? null : 'validation.cron'),
  };

  // Find the first error type that returns a validation error
  const errorType = errorTypes.find(
    (error) => errorTypeMap[error] && errorTypeMap[error]()
  );

  return errorType ? errorTypeMap[errorType]() : null;
}
