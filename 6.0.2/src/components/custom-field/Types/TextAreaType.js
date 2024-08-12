import React from 'react';
import {Field} from 'redux-form';
import {BaseInput} from '@/components';
import {MAX_LENGTH} from '@/constants';

/**
 * Renders a TextArea input field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered TextArea input field.
 */
export function TextAreaType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseInput}
      hint={label}
      placeholder={placeholder}
      inputProps={{
        multiline: true,
        maxLength: MAX_LENGTH,
      }}
      height={80}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
