import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each fiscal year.
   */
  fiscalYears?: Array<any>;
}

/**
 * A modal component for selecting fiscal years.
 *
 * @param props - The properties for the FiscalYearSelectModal component.
 * @returns A rendered SelectField component for fiscal year selection.
 */
export const FiscalYearSelectModal = (props: IProps) => (
  <SelectField
    {...props}
    items={props?.fiscalYears ?? []} // Fallback to empty array if fiscalYears is undefined
    displayName="key"
    label={t('settings.preferences.fiscal_year')}
    icon="calendar-alt"
    rightIcon="angle-right"
    placeholder={t('settings.preferences.fiscal_year_placeholder')}
    searchFields={['key']}
    compareField="value"
    headerProps={{title: t('fiscal_years.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'fiscal_years'}}
    isInternalSearch
    isRequired
  />
);
