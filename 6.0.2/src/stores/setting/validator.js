import {getError} from '@/validator';

/**
 * Validates notification settings.
 * @param {Object} values - The values to validate.
 * @returns {Object} - An object containing validation errors.
 */
export const validateNotification = (values) => {
  const errors = {};
  const {notification_email} = values;

  // Validate the notification_email field
  errors.notification_email = getError(notification_email, [
    'required',
    'emailFormat',
  ]);

  return errors; // Return the validation errors
};
