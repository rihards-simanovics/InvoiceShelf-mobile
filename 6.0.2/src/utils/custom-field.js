import {find} from 'lodash';
import {hasValue, isEmpty} from '@/constants';
import {sortByItem} from './common';
import {dataTypes} from 'stores/custom-field/helpers';

/**
 * Initializes custom fields based on provided initial values and custom fields.
 *
 * @param {Array} customFields - The array of custom fields to initialize.
 * @param {Array} initialValues - The initial values to populate the custom fields.
 * @returns {Array} - The initialized and sorted custom fields.
 */
export const getInitialCustomFields = (customFields, initialValues) => {
  let fields = [];

  if (!isEmpty(initialValues)) {
    initialValues.map((value) => {
      fields.push({
        ...value.custom_field,
        defaultAnswer: value.defaultAnswer ?? value.default_answer,
      });
    });
  }

  if (!isEmpty(customFields)) {
    customFields.map((customField) => {
      const isOld = find(fields, {id: customField.id});
      if (!isOld) fields.push(customField);
    });
  }

  return sortByItem(fields, 'order');
};

/**
 * Retrieves the parameters for custom field values.
 *
 * @param {Array} customFields - The array of custom fields to process.
 * @returns {Array} - An array of objects containing the custom field values and metadata.
 */
export const getCustomFieldValueParams = (customFields) => {
  if (isEmpty(customFields)) {
    return [];
  }

  return customFields.map((field) => {
    const {
      id,
      type,
      defaultAnswer = null,
      default_answer = null,
      is_required,
    } = field;

    let value = defaultAnswer ?? default_answer;

    return {
      id,
      type,
      isRequired: is_required,
      value: type !== dataTypes.SWITCH ? value?.toString() : value,
    };
  });
};

/**
 * Formats custom fields for API submission.
 *
 * @param {Array} customFields - The array of custom fields to format.
 * @returns {Array} - An array of formatted custom fields ready for API submission.
 */
export const getApiFormattedCustomFields = (customFields) => {
  if (isEmpty(customFields)) {
    return [];
  }

  const apiFormattedFields = [];

  customFields.map((field) => {
    let isAllow = true;

    if (
      !hasValue(field?.value) &&
      (field.type === dataTypes.DATE ||
        field.type === dataTypes.TIME ||
        field.type === dataTypes.DATE_TIME)
    ) {
      isAllow = false;
    }

    if (isAllow) {
      apiFormattedFields.push({...field, value: field?.value ?? null});
    }
  });

  return apiFormattedFields;
};
