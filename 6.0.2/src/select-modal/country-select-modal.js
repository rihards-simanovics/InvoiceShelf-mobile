import React from 'react';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';
import {find} from 'lodash';
import {isEmpty} from '@/constants';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each country.
   */
  countries?: Array<any>;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * An object containing input properties.
   */
  input?: Object;
}

/**
 * A modal component for selecting countries.
 *
 * @param props - The properties for the CountrySelectModal component.
 * @returns A rendered InternalPagination component for country selection.
 */
export const CountrySelectModal = (props: IProps) => {
  const {countries, disabled, input, theme} = props;

  /**
   * Retrieves the title of the selected country based on input value.
   *
   * @returns The title of the selected country or a space if none is selected.
   */
  const getSelectedCountryTitle = () => {
    if (isEmpty(countries) || !input?.value) {
      return ' ';
    }

    const country = find(countries, {
      fullItem: {id: Number(input?.value)},
    });

    return country?.title;
  };

  /**
   * Retrieves the symbol of the selected country based on input value.
   *
   * @returns The symbol of the selected country or a space if none is selected.
   */
  const getSelectedCountrySymbol = () => {
    if (isEmpty(countries) || !input?.value) {
      return ' ';
    }

    const country = find(countries, {
      fullItem: {id: Number(input?.value)},
    });

    return country?.fullItem?.code;
  };

  return (
    <InternalPagination
      {...props}
      items={countries ?? []} // Fallback to empty array if countries is undefined
      label={t('customers.address.country')}
      placeholder={getSelectedCountryTitle()}
      displayName="name"
      rightIcon="angle-right"
      searchFields={['name']}
      compareField="id"
      isInternalSearch
      headerProps={{
        title: t('header.country'),
        rightIconPress: null,
      }}
      listViewProps={{contentContainerStyle: {flex: 7}}}
      emptyContentProps={{contentType: 'countries'}}
      baseSelectProps={{
        leftSymbol: getSelectedCountrySymbol(),
        leftSymbolStyle: {color: theme?.icons?.secondaryColor},
        disabled,
      }}
      isAllowToSelect={!disabled}
    />
  );
};
