import React from 'react';
import {SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each category.
   */
  categories?: Array<any>;

  /**
   * An action to fetch the list of categories.
   */
  fetchCategories?: () => void;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;
}

/**
 * A modal component for selecting expense categories.
 *
 * @param props - The properties for the ExpenseCategorySelectModal component.
 * @returns A rendered SelectField component for category selection.
 */
export const ExpenseCategorySelectModal = (props: IProps) => {
  const {categories, fetchCategories, disabled = false} = props;

  return (
    <SelectField
      {...props}
      items={categories ?? []} // Fallback to empty array if categories is undefined
      getItems={fetchCategories}
      isRequired
      apiSearch
      hasPagination
      displayName="name"
      label={t('expenses.category')}
      icon="align-center"
      compareField="id"
      headerProps={{title: t('expenses.category_placeholder')}}
      emptyContentProps={{contentType: 'categories'}}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
