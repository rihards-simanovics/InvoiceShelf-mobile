import {isBooleanTrue, isEmpty} from '@/constants';
import {createSelector} from 'reselect';

// Selectors for accessing company state
const companyStore = (state) => state?.company;
const configStore = (state) => state.common?.config;

/**
 * Converts a field in the company store to an array.
 * @param {Object} state - The application state.
 * @param {string} field - The field to convert.
 * @returns {Array} The array representation of the field.
 */
const toArray = (state, field) =>
  isEmpty(companyStore(state)[field]) ? [] : companyStore(state)[field];

/**
 * Selector for timezones.
 */
export const timeZonesSelector = createSelector(
  (state) => toArray(state, 'timezones'),
  (timezones) => timezones.map((_tz) => ({title: _tz.key, fullItem: _tz}))
);

/**
 * Selector for date formats.
 */
export const dateFormatsSelector = createSelector(
  (state) => toArray(state, 'dateFormats'),
  (dateFormats) =>
    dateFormats.map((_d) => ({title: _d.display_date, fullItem: _d}))
);

/**
 * Selector for loading state.
 */
export const loadingSelector = createSelector(companyStore, (store) => ({
  isSaving: store?.isSaving,
}));

/**
 * Selector for currencies.
 */
export const currenciesSelector = createSelector(
  (state) => toArray(state, 'currencies'),
  (currencies) =>
    currencies.map((_c) => ({
      title: _c.name,
      subtitle: {title: _c.code},
      rightTitle: _c.symbol || '-',
      fullItem: _c,
    }))
);

/**
 * Selector for languages.
 */
export const languagesSelector = (state) => {
  const languages = configStore(state)?.languages;
  if (isEmpty(languages)) return [];

  return languages.map((_lng) => ({
    title: _lng.name,
    leftAvatar: _lng.name.toUpperCase().charAt(0),
    fullItem: _lng,
  }));
};

/**
 * Selector for fiscal years.
 */
export const fiscalYearsSelector = (state) => {
  const fiscalYears = configStore(state)?.fiscal_years;
  if (isEmpty(fiscalYears)) return [];
  return fiscalYears.map((year) => ({title: year.key, fullItem: year}));
};

/**
 * Selector for companies.
 */
export const companiesSelector = (state) =>
  isEmpty(state?.company?.companies) ? [] : state?.company?.companies;

/**
 * Selector for the current company.
 */
export const currentCompanySelector = (state) => state.company?.selectedCompany;

/**
 * Selector for the current company's address.
 */
export const currentCompanyAddressSelector = (state) =>
  state.company?.selectedCompany?.address;

/**
 * Selector for the current currency.
 */
export const currentCurrencySelector = (state) =>
  state.company?.selectedCompanyCurrency;

/**
 * Selector for selected company settings.
 */
export const selectedCompanySettingSelector = (state) =>
  state?.company?.selectedCompanySettings;

/**
 * Helper function to extract sales tax settings.
 * @param {Object} settings - The settings object.
 * @returns {Object} The sales tax settings.
 */
const salesTaxSettings = (settings) => {
  if (!isBooleanTrue(settings?.sales_tax_us_enabled)) {
    return {};
  }
  return {
    sales_tax_us_enabled: settings.sales_tax_us_enabled,
    sales_tax_type: settings.sales_tax_type,
    sales_tax_address_type: settings.sales_tax_address_type,
  };
};

/**
 * Selector for selected company sales tax settings.
 */
export const selectedCompanySalesTaxSettingSelector = createSelector(
  (state) => state?.company?.selectedCompanySettings,
  (settings) => salesTaxSettings(settings)
);
