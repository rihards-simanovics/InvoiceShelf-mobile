import React from 'react';
import {Field} from 'redux-form';
import {BaseDatePicker} from '@/components';

/**
 * Renders a Date picker field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered Date picker field.
 */
export function DateType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseDatePicker}
      label={label}
      formDateFormat="YYYY-MM-DD"
      isRequired={is_required}
      placeholder={placeholder ?? ' '}
      disabled={disabled}
    />
  );
}
