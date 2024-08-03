import React from 'react';
import {AssetImage, SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each customer.
   */
  customers?: Array<any>;

  /**
   * An action to fetch the list of customers.
   */
  fetchCustomers?: () => void;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;
}

/**
 * A modal component for selecting customers.
 *
 * @param props - The properties for the CustomerSelectModal component.
 * @returns A rendered SelectField component for customer selection.
 */
export const CustomerSelectModal = (props: IProps) => {
  const {customers, fetchCustomers, disabled, isRequired = true} = props;

  return (
    <SelectField
      placeholder={t('estimates.customer_placeholder')}
      {...props}
      items={customers ?? []} // Fallback to empty array if customers is undefined
      getItems={fetchCustomers}
      isRequired={isRequired}
      apiSearch
      hasPagination
      displayName="name"
      label={t('customers.customer')}
      icon={'user'}
      compareField="id"
      createActionRouteName={routes.MAIN_CUSTOMERS}
      headerProps={{title: t('customers.title')}}
      listViewProps={{hasAvatar: true}}
      emptyContentProps={{
        contentType: 'customers',
        image: AssetImage.images.empty_customers,
      }}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
