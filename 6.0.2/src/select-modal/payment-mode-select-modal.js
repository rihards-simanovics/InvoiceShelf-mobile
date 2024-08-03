import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';

interface IProps {
  /**
   * An array of objects with data for each payment mode.
   */
  paymentModes?: Array<any>;

  /**
   * An action to fetch the list of payment modes.
   */
  fetchPaymentModes?: () => void;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;
}

/**
 * A modal component for selecting payment modes.
 *
 * @param props - The properties for the PaymentModeSelectModal component.
 * @returns A rendered SelectField component for payment mode selection.
 */
export const PaymentModeSelectModal = (props: IProps) => {
  const {paymentModes, fetchPaymentModes, disabled} = props;

  return (
    <SelectField
      {...props}
      items={paymentModes ?? []} // Fallback to empty array if paymentModes is undefined
      apiSearch
      hasPagination
      getItems={fetchPaymentModes}
      displayName="name"
      label={t('payments.mode')}
      icon="align-center"
      placeholder={t('payments.mode_placeholder')}
      compareField="id"
      headerProps={{title: t('payments.mode_placeholder')}}
      emptyContentProps={{contentType: 'payment_modes'}}
      inputModalName="PaymentModeModal"
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
