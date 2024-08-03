import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SelectField, View} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {Text} from '@/components';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each tax type.
   */
  taxTypes?: Array<any>;

  /**
   * An action to fetch the list of taxes.
   */
  fetchTaxes?: () => void;

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
   * Custom view class for styling.
   */
  customViewClass?: string;

  /**
   * An array of selected tax items.
   */
  multiSelectedItems?: Array<any>;
}

/**
 * A modal component for selecting tax types.
 *
 * @param props - The properties for the TaxSelectModal component.
 * @returns A rendered SelectField component for tax selection.
 */
export const TaxSelectModal = (props: IProps) => {
  const {
    taxTypes,
    fetchTaxes,
    disabled = false,
    theme,
    customViewClass,
    multiSelectedItems,
  } = props;

  return (
    <SelectField
      input={{value: null}} // Initial input value
      {...props}
      items={taxTypes ?? []} // Fallback to empty array if taxTypes is undefined
      getItems={fetchTaxes}
      apiSearch
      hasPagination
      isMultiSelect
      concurrentMultiSelect
      onlyPlaceholder
      compareField="id"
      multiSelectedItems={multiSelectedItems}
      valueCompareField="tax_type_id"
      headerProps={{title: t('taxes.title')}}
      displayName="name"
      createActionRouteName={routes.TAXES}
      listViewProps={{contentContainerStyle: {flex: 2}}}
      emptyContentProps={{contentType: 'taxes'}}
      isEditable={!disabled}
      baseSelectProps={{
        disabled,
        ...(props['custom-view']
          ? {
              customView: ({props}) => (
                <View className={`flex-row ${customViewClass}`}>
                  <View style={{flex: 0.9}} />
                  <TouchableOpacity
                    onPress={() => props?.onChangeCallback?.()}
                    activeOpacity={0.5}
                    style={{flex: 0.5}}
                  >
                    <Text right medium h4 color={theme?.viewLabel?.thirdColor}>
                      {t('estimates.tax_placeholder')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
            }
          : {
              label: t('items.taxes'),
              placeholder: t('items.select_tax'),
              icon: 'percent',
              leftIconProps: {
                size: 14,
                style: {paddingLeft: 19},
              },
            }),
      }}
    />
  );
};
