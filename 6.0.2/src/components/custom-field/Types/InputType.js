import React from 'react';
import {Field} from 'redux-form';
import {BaseInput} from '@/components';

/**
 * Renders an Input field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered Input field.
 */
export function InputType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseInput}
      hint={label}
      placeholder={placeholder}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
