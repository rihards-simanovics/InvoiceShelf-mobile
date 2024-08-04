import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

/**
 * Generates the menu items for the "More" section of the application.
 * Each menu item includes a title, icon, route, and visibility based on permissions.
 * @returns {Array<object>} An array of menu item objects.
 */
export const MORE_MENU = () => {
  return [
    {
      title: t('more.recurring_invoice'), // Title for recurring invoices
      leftIcon: 'file', // Icon for the menu item
      leftIconSolid: true, // Indicates if the icon is solid
      iconSize: 19, // Size of the icon
      fullItem: {route: routes.RECURRING_INVOICES}, // Route for navigation
      show: PermissionService.isAllowToView(routes.RECURRING_INVOICES), // Visibility based on permissions
    },
    {
      title: t('more.estimate'), // Title for estimates
      leftIcon: 'file-alt', // Icon for the menu item
      leftIconSolid: true,
      iconSize: 19,
      fullItem: {route: routes.ESTIMATES},
      show: PermissionService.isAllowToView(routes.ESTIMATES),
    },
    {
      title: t('more.items'), // Title for items
      leftIcon: 'product-hunt', // Icon for the menu item
      iconSize: 20,
      fullItem: {route: routes.ITEMS},
      show: PermissionService.isAllowToView(routes.ITEMS),
    },
    {
      title: t('more.users'), // Title for users
      leftIcon: 'users', // Icon for the menu item
      iconSize: 20,
      fullItem: {route: routes.USERS},
      show: PermissionService.isOwner, // Only owners can view this item
    },
    {
      title: t('more.reports'), // Title for reports
      leftIcon: 'signal', // Icon for the menu item
      iconSize: 15,
      fullItem: {route: routes.REPORTS},
      show: PermissionService.isOwner, // Only owners can view this item
    },
    {
      title: t('header.custom_fields'), // Title for custom fields
      leftIcon: 'cube', // Icon for the menu item
      iconSize: 20,
      fullItem: {route: routes.CUSTOM_FIELDS},
      show: PermissionService.isAllowToView(routes.CUSTOM_FIELDS),
    },
    {
      title: t('settings.expense_category'), // Title for expense categories
      leftIcon: 'clipboard-list', // Icon for the menu item
      iconSize: 20,
      fullItem: {route: routes.CATEGORIES},
      show: PermissionService.isAllowToView(routes.MAIN_EXPENSES),
    },
    {
      title: t('more.settings'), // Title for settings
      leftIcon: 'cogs', // Icon for the menu item
      iconSize: 17,
      fullItem: {route: routes.SETTING_LIST},
      show: true, // Always show settings
    },
    {
      title: t('more.logout'), // Title for logout
      leftIcon: 'sign-out-alt', // Icon for the menu item
      iconSize: 19,
      fullItem: {action: 'onLogout'}, // Action for logout
      show: true, // Always show logout
    },
  ];
};
