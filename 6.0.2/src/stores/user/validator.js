import {getError} from '@/validator';

/**
 * Validate user input values.
 * @param {Object} values - The values to validate.
 * @returns {Object} - The object containing validation errors.
 */
export const validate = (values) => {
  const errors = {};
  const {name, email, password, confirmPassword} = values;

  // Validate each field and store errors
  errors.name = getError(name, ['required']);
  errors.email = getError(email, ['required', 'emailFormat']);
  errors.password = getError(
    password,
    ['passwordCompared', 'minCharacterRequired'],
    {minCharacter: 8, fieldName: confirmPassword}
  );
  errors.confirmPassword = getError(confirmPassword, ['passwordCompared'], {
    fieldName: password,
  });

  return errors;
};
