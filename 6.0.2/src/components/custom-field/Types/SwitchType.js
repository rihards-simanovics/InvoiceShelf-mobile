import React from 'react';
import {Field} from 'redux-form';
import {StyleSheet} from 'react-native';
import {BaseSwitch} from '@/components';

/**
 * Renders a Switch input field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered Switch input field.
 */
export function SwitchType({field, name, disabled}) {
  const {label = null, is_required = false} = field;

  return (
    <Field
      name={name}
      component={BaseSwitch}
      isRequired={is_required}
      hint={label ?? ' '}
      hintStyle={styles.label}
      containerStyle={styles.container}
      disabled={disabled}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  label: {
    width: 'auto',
    marginRight: 15,
  },
});
