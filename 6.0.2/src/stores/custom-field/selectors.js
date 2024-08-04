import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';
import {colors} from '@/styles';
import moment from 'moment';

const customFieldStore = (state) => state?.customField;

/**
 * Selector for retrieving custom fields from the state.
 * @param {Object} state - The Redux state.
 * @returns {Array} - The list of custom fields.
 */
export const customFieldsSelector = createSelector(customFieldStore, (store) =>
  !isEmpty(store?.customFields) ? store?.customFields : []
);

/**
 * Selector for formatting custom fields for display.
 * @param {Object} state - The Redux state.
 * @returns {Array} - The formatted custom fields.
 */
export const formattedCustomFieldsSelector = createSelector(
  (state) => state.customField.customFields,
  (state) => state.common.theme,
  (customFields, theme) => {
    if (isEmpty(customFields)) return [];

    return customFields.map((field) => {
      const {name, type, model_type, created_at} = field;
      return {
        title: name,
        subtitle: {
          label: type,
          ...(theme.mode === 'dark'
            ? {
                labelTextColor: colors.white4,
                labelOutlineColor: colors.white4,
              }
            : {
                labelBgColor: colors.gray2,
                labelTextColor: colors.darkGray2,
              }),
        },
        rightTitle: model_type,
        rightSubtitle: moment(created_at).format('DD MMM YYYY'),
        fullItem: field,
      };
    });
  }
);

/**
 * Selector for loading states (saving and deleting).
 * @param {Object} state - The Redux state.
 * @returns {{isSaving: boolean, isDeleting: boolean}} - The loading states.
 */
export const loadingSelector = createSelector(customFieldStore, (store) => ({
  isSaving: store?.isSaving,
  isDeleting: store?.isDeleting,
}));
