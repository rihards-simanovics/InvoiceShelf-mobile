import React from 'react';
import {Field} from 'redux-form';
import {isEmpty} from '@/constants';
import {BaseDropdownPicker} from '@/components';

/**
 * Renders a Dropdown picker field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.field - The field configuration.
 * @param {string} props.name - The name of the field.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 * @returns {JSX.Element} The rendered Dropdown picker field.
 */
export function DropdownType({field, name, disabled}) {
  const {
    label = null,
    is_required = false,
    placeholder = null,
    options = [],
  } = field;

  /**
   * Formats the options for the dropdown.
   *
   * @returns {Array} The formatted options.
   */
  const optionsFormat = () => {
    const items = [];
    if (isEmpty(options)) return [];

    options.forEach((option) => {
      if (option && option.length !== 0) {
        items.push({
          label: option,
          value: option,
        });
      }
    });

    return items;
  };

  return (
    <Field
      name={name}
      component={BaseDropdownPicker}
      label={label}
      fieldIcon="align-center"
      items={optionsFormat()}
      isRequired={is_required}
      defaultPickerOptions={{
        label: placeholder ?? 'Select an item...',
        value: null,
      }}
      findValueByForm={false}
      disabled={disabled}
    />
  );
}
