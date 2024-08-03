// Importing necessary modules and components
import {hasObjectLength} from '@/constants';
import {showNotification} from './notification';
import t from 'locales/use-translation';

/**
 * Displays a notification for already in use error messages based on the error type.
 *
 * @param {string} error - The error message string that indicates the type of error.
 */
const alreadyInUseErrorMessage = (error) => {
  const type = error.split('_attached')?.[0];

  // Determine the type of error and show the corresponding notification
  switch (type) {
    case 'expense':
      showNotification({
        message: t('notification.expense_already_in_use'),
        type: 'error',
      });
      break;

    case 'values':
      showNotification({
        message: t('notification.custom_field_already_in_use'),
        type: 'error',
      });
      break;

    case 'taxes':
      showNotification({
        message: t('notification.tax_already_in_use'),
        type: 'error',
      });
      break;

    case 'payments':
      showNotification({
        message: t('notification.payment_mode_already_in_use'),
        type: 'error',
      });
      break;

    case 'items':
      showNotification({
        message: t('notification.item_unit_already_in_use'),
        type: 'error',
      });
      break;

    default:
      break; // No action for unrecognized error types
  }
};

/**
 * Displays a notification for general error messages based on the provided message.
 *
 * @param {string} message - The error message string to be displayed.
 */
const errorMessage = (message) => {
  // Determine the specific error message and show the corresponding notification
  switch (message) {
    case 'total_invoice_amount_must_be_more_than_paid_amount':
      showNotification({
        message: t('notification.invalid_due_amount_message'),
        type: 'error',
      });
      break;

    case 'address_incomplete':
      showNotification({
        message: t('notification.address_incomplete'),
        type: 'error',
      });
      break;

    case 'invalid_state':
      showNotification({
        message: t('notification.invalid_state'),
        type: 'error',
      });
      break;

    case 'invalid_city':
      showNotification({
        message: t('notification.invalid_city'),
        type: 'error',
      });
      break;

    case 'invalid_postal_code':
      showNotification({
        message: t('notification.invalid_postal_code'),
        type: 'error',
      });
      break;

    case 'invalid_format':
      showNotification({
        message: t('notification.address_incomplete'),
        type: 'error',
      });
      break;

    default:
      showNotification({message, type: 'error'});
      break; // Fallback for unrecognized messages
  }
};

/**
 * Displays a notification for required field error messages.
 *
 * @param {Object} errors - An object containing error messages for required fields.
 * @returns {{key: string, error: string}} An object containing the first error key and message.
 */
const requiredErrorMessage = (errors) => {
  const key = Object.keys(errors)?.[0];
  const error = Object.values(errors)?.[0]?.[0];
  error && showNotification({message: error, type: 'error'});
  return {key, error};
};

/**
 * Handles error responses and displays appropriate notifications based on the error type.
 *
 * @param {Object} e - The error object containing error details.
 */
export const handleError = (e) => {
  try {
    const error = e?.data?.error;
    const errors = e?.data?.errors;
    const message = e?.data?.message;

    // Check if there are required field errors
    if (hasObjectLength(errors)) {
      const {key, error} = requiredErrorMessage(errors);
      return {key, error};
    }

    // Handle already in use error messages
    if (error && typeof error === 'string' && error.includes('_attached')) {
      alreadyInUseErrorMessage(error);
      return;
    }

    // Handle general error messages
    if (error && typeof error === 'string') {
      errorMessage(error);
      return;
    }

    // Handle message if available
    if (message) {
      errorMessage(message);
    }
  } catch (e) {
    // Optionally handle any errors that occur during error handling
  }
};
