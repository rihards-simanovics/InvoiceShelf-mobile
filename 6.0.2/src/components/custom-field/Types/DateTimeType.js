import React from 'react';
import {Field} from 'redux-form';
import {BaseDateTimePicker} from '@/components';

/**
 * Renders a DateTime picker field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered DateTime picker field.
 */
export function DateTimeType({field, name, disabled}) {
  const {label = null, is_required = false} = field;

  return (
    <Field
      name={name}
      component={BaseDateTimePicker}
      label={label}
      isRequired={is_required}
      dateFieldName={`${name}-date`}
      timeFieldName={`${name}-time`}
      callOnChangeInMount
      removeSecond
      disabled={disabled}
    />
  );
}
