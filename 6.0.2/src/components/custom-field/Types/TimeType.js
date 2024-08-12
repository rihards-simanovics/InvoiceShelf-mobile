import React from 'react';
import {Field} from 'redux-form';
import {BaseTimePicker} from '@/components';

/**
 * Renders a Time picker field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered Time picker field.
 */
export function TimeType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseTimePicker}
      label={label}
      isRequired={is_required}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
