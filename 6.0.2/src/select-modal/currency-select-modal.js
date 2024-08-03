import React from 'react';
import {find} from 'lodash';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';
import {isEmpty} from '@/constants';
import {SymbolStyle} from '@/components/currency-format';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each currency.
   */
  currencies?: Array<any>;

  /**
   * An object containing input properties.
   */
  input?: Object;

  /**
   * Props for the base select input.
   */
  baseSelectProps?: any;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

/**
 * A modal component for selecting currencies.
 *
 * @param props - The properties for the CurrencySelectModal component.
 * @returns A rendered InternalPagination component for currency selection.
 */
export const CurrencySelectModal = (props: IProps) => {
  const {currencies, input, baseSelectProps, disabled, theme} = props;

  /**
   * Retrieves the symbol of the selected currency based on input value.
   *
   * @returns The symbol of the selected currency or null if none is selected.
   */
  const getSelectedCurrencySymbol = () => {
    if (isEmpty(currencies) || !input?.value) {
      return null;
    }

    const currency = find(currencies, {
      fullItem: {id: Number(input?.value)},
    });

    return currency?.fullItem?.code;
  };

  /**
   * Retrieves the title of the selected currency based on input value.
   *
   * @returns The title of the selected currency or a placeholder if none is selected.
   */
  const getSelectedCurrencyTitle = () => {
    if (isEmpty(currencies) || !input?.value) {
      return t('settings.preferences.currency_placeholder');
    }

    const currency = find(currencies, {
      fullItem: {id: Number(input?.value)},
    });

    return currency?.title;
  };

  return (
    <InternalPagination
      placeholder={getSelectedCurrencyTitle()}
      {...props}
      items={currencies ?? []} // Fallback to empty array if currencies is undefined
      displayName="name"
      searchFields={['name']}
      compareField="id"
      headerProps={{title: t('currencies.title'), rightIconPress: null}}
      emptyContentProps={{contentType: 'currencies'}}
      isAllowToSelect={!disabled}
      baseSelectProps={{
        leftSymbol: getSelectedCurrencySymbol(),
        leftSymbolStyle: {color: theme?.icons?.primaryColor},
        disabled,
        ...baseSelectProps,
      }}
      listViewProps={{
        contentContainerStyle: {flex: 5},
        rightTitleStyle: SymbolStyle,
      }}
    />
  );
};
