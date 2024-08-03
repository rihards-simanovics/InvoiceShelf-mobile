// Importing necessary modules and components
import t from 'locales/use-translation';
import {ARROW_ICON} from '@/assets';
import {navigation, routes} from '@/navigation';

/**
 * Retrieves layout properties for the header based on the current route.
 *
 * @param {Object} route - The current route object.
 * @returns {{title: string, navigateToRoute: string|null}} An object containing the title and navigation route for the header.
 */
const layoutProps = (route) => {
  switch (route?.name) {
    case routes.CATEGORIES:
      return {
        title: t('header.expense_category'),
        navigateToRoute: routes.CREATE_CATEGORY,
      };
    case routes.USERS:
      return {
        title: t('header.users'),
        navigateToRoute: routes.CREATE_USER,
      };
    case routes.ROLES:
      return {
        title: t('header.roles'),
        navigateToRoute: routes.CREATE_ROLE,
      };
    case routes.RECURRING_INVOICES:
      return {
        title: t('header.recurring_invoices'),
        navigateToRoute: routes.CREATE_RECURRING_INVOICE,
      };
    case routes.NOTES:
      return {
        title: t('header.notes'),
        navigateToRoute: routes.CREATE_NOTE,
      };
    case routes.TAXES:
      return {
        title: t('header.taxes'),
        navigateToRoute: routes.CREATE_TAX,
      };
    case routes.CUSTOM_FIELDS:
      return {
        title: t('header.custom_fields'),
        navigateToRoute: routes.CREATE_CUSTOM_FIELD,
      };
    default:
      return {title: '', navigateToRoute: null}; // Default case for unrecognized routes
  }
};

/**
 * Retrieves the secondary header title based on the current route and edit permissions.
 *
 * @param {Object} params - Parameters containing route and edit permissions.
 * @returns {string} The title for the secondary header.
 */
const secondaryHeaderTitle = (params) => {
  const {isEditScreen, isAllowToEdit} = params;
  const isUpdate = isEditScreen && isAllowToEdit;
  const isView = isEditScreen && !isAllowToEdit;

  /**
   * Gets the appropriate title based on the screen type.
   *
   * @param {string} addScreenTitle - The title for the add screen.
   * @param {string} updateScreenTitle - The title for the update screen.
   * @param {string} viewScreenTitle - The title for the view screen.
   * @returns {string} The selected title based on the screen type.
   */
  function getTitle(addScreenTitle, updateScreenTitle, viewScreenTitle) {
    return isView
      ? t(viewScreenTitle)
      : isUpdate
      ? t(updateScreenTitle)
      : t(addScreenTitle);
  }

  // Determine the title based on the current route
  switch (params?.route?.name) {
    case routes.CREATE_USER:
      return getTitle(
        'header.add_user',
        'header.edit_user',
        'header.view_user'
      );

    case routes.CREATE_RECURRING_INVOICE:
      return getTitle(
        'header.add_recurring_invoice',
        'header.edit_recurring_invoice',
        'header.view_recurring_invoice'
      );

    case routes.CREATE_ROLE:
      return getTitle(
        'header.add_role',
        'header.edit_role',
        'header.view_role'
      );

    case routes.CREATE_CATEGORY:
      return getTitle(
        'header.add_category',
        'header.edit_category',
        'header.view_category'
      );

    case routes.CREATE_COMPANY:
      return getTitle(
        'header.add_company',
        'header.setting.company',
        'header.setting.company'
      );

    case routes.ACCOUNT_INFO:
      return getTitle(
        'header.setting.account',
        'header.setting.account',
        'header.setting.account'
      );

    case routes.CREATE_NOTE:
      return getTitle(
        'header.add_note',
        'header.edit_note',
        'header.view_note'
      );

    case routes.CREATE_TAX:
      return getTitle('header.add_tax', 'header.edit_tax', 'header.view_tax');

    case routes.CREATE_CUSTOMER:
      return getTitle(
        'header.add_customer',
        'header.edit_customer',
        'header.view_customer'
      );

    case routes.CREATE_CUSTOM_FIELD:
      return getTitle(
        'header.add_custom_field',
        'header.edit_custom_field',
        'header.view_custom_field'
      );

    case routes.CREATE_PAYMENT:
      return getTitle(
        'header.add_payment',
        'header.edit_payment',
        'header.view_payment'
      );

    default:
      return ''; // Default case for unrecognized routes
  }
};

/**
 * Constructs the primary header configuration based on the current route and parameters.
 *
 * @param {Object} params - Parameters containing route and icon press handlers.
 * @returns {{title: string, route: Object, placement: string, leftIcon: string, rightIcon: string, leftIconPress: function, rightIconPress: function}} The configuration for the primary header.
 */
export const primaryHeader = (params) => {
  const {route} = params;
  const {title, navigateToRoute} = layoutProps(route);

  // Function to handle left icon press action
  const leftIconPress = () => {
    if (params?.leftIconPress) {
      params?.leftIconPress();
      return;
    }
    navigation.goBack(); // Default action to go back
  };

  // Function to handle right icon press action
  const rightIconPress = () => {
    if (params?.rightIconPress) {
      params?.rightIconPress();
      return;
    }
    navigation.navigateTo({route: navigateToRoute, params: {type: 'ADD'}});
  };

  return {
    title,
    route,
    placement: 'center',
    leftIcon: ARROW_ICON,
    rightIcon: 'plus',
    leftIconPress,
    rightIconPress,
  };
};

/**
 * Constructs the secondary header configuration based on the current parameters.
 *
 * @param {Object} params - Parameters containing edit permissions and icon press handlers.
 * @returns {{leftIconPress: function, title: string, placement: string, rightIcon?: string, rightIconProps?: Object}} The configuration for the secondary header.
 */
export const secondaryHeader = (params) => {
  const {isAllowToEdit, rightIconPress} = params;

  // Function to handle left icon press action
  const leftIconPress = () => {
    if (params?.leftIconPress) {
      params?.leftIconPress();
      return;
    }
    navigation.goBack(); // Default action to go back
  };

  return {
    leftIconPress,
    title: secondaryHeaderTitle(params),
    placement: 'center',
    ...(isAllowToEdit && {
      rightIcon: 'save',
      rightIconProps: {solid: true},
      rightIconPress,
    }),
  };
};
