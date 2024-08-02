// Import necessary modules
import {find} from 'lodash';
import {hasValue, toObject} from '@/constants';
import {routes} from '@/navigation/navigation-routes';

// Define abilities for different routes and actions
const abilities = [
  // Customer
  {route: routes.MAIN_CUSTOMERS, ability: 'view-customer'},
  {route: routes.MAIN_CUSTOMERS, ability: 'create-customer'},
  {route: routes.CREATE_CUSTOMER, ability: 'edit-customer'},
  {route: routes.CREATE_CUSTOMER, ability: 'delete-customer'},

  // Item
  {route: routes.ITEMS, ability: 'view-item'},
  {route: routes.ITEMS, ability: 'create-item'},
  {route: routes.CREATE_ITEM, ability: 'edit-item'},
  {route: routes.CREATE_ITEM, ability: 'delete-item'},

  // Estimate
  {route: routes.ESTIMATES, ability: 'view-estimate'},
  {route: routes.ESTIMATES, ability: 'create-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'edit-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'delete-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'send-estimate'},

  // Invoice
  {route: routes.MAIN_INVOICES, ability: 'view-invoice'},
  {route: routes.MAIN_INVOICES, ability: 'create-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'edit-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'delete-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'send-invoice'},

  // Recurring Invoice
  {route: routes.RECURRING_INVOICES, ability: 'view-recurring-invoice'},
  {route: routes.RECURRING_INVOICES, ability: 'create-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'edit-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'delete-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'send-recurring-invoice'},

  // Payment
  {route: routes.MAIN_PAYMENTS, ability: 'view-payment'},
  {route: routes.MAIN_PAYMENTS, ability: 'create-payment'},
  {route: routes.CREATE_PAYMENT, ability: 'edit-payment'},
  {route: routes.CREATE_PAYMENT, ability: 'delete-payment'},
  {route: routes.CREATE_PAYMENT, ability: 'send-payment'},

  // Expense
  {route: routes.MAIN_EXPENSES, ability: 'view-expense'},
  {route: routes.MAIN_EXPENSES, ability: 'create-expense'},
  {route: routes.CREATE_EXPENSE, ability: 'edit-expense'},
  {route: routes.CREATE_EXPENSE, ability: 'delete-expense'},

  // Tax Type
  {route: routes.TAXES, ability: 'view-tax-type'},
  {route: routes.TAXES, ability: 'create-tax-type'},
  {route: routes.CREATE_TAX, ability: 'edit-tax-type'},
  {route: routes.CREATE_TAX, ability: 'delete-tax-type'},

  // Custom Field
  {route: routes.CUSTOM_FIELDS, ability: 'view-custom-field'},
  {route: routes.CUSTOM_FIELDS, ability: 'create-custom-field'},
  {route: routes.CREATE_CUSTOM_FIELD, ability: 'edit-custom-field'},
  {route: routes.CREATE_CUSTOM_FIELD, ability: 'delete-custom-field'},

  // Settings
  {route: routes.NOTES, ability: 'view-all-notes'},
];

/**
 * Class representing the Permission service.
 */
class Service {
  currentAbilities: any;
  isOwner: boolean;

  /**
   * Create a Service instance.
   */
  constructor() {
    this.currentAbilities = [];
    this.isOwner = false;
  }

  /**
   * Set the current permissions and ownership status.
   * @param {Array} currentAbilities - The current abilities of the user.
   * @param {boolean} isOwner - Whether the user is the owner.
   */
  setPermissions = (currentAbilities, isOwner) => {
    this.currentAbilities = currentAbilities ?? [];
    this.isOwner = isOwner;
  };

  /**
   * Check if the user has a specific permission.
   * @param {string} ability - The ability to check.
   * @returns {boolean} - True if the user has the permission, otherwise false.
   */
  hasPermission = (ability) => {
    if (!hasValue(ability)) {
      return true;
    }

    if (this.isOwner) {
      return true;
    }

    return hasValue(find(this.currentAbilities, {name: ability}));
  };

  /**
   * Check if the user is allowed to create an item on a specific route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the user is allowed to create, otherwise false.
   */
  isAllowToCreate = (route) => {
    const ability = toObject(
      abilities.filter((a) => a.route === route && a.ability.includes('create'))
    )?.ability;
    return this.hasPermission(ability);
  };

  /**
   * Check if the user is allowed to edit an item on a specific route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the user is allowed to edit, otherwise false.
   */
  isAllowToEdit = (route) => {
    const ability = toObject(
      abilities.filter((a) => a.route === route && a.ability.includes('edit'))
    )?.ability;
    return this.hasPermission(ability);
  };

  /**
   * Check if the user is allowed to delete an item on a specific route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the user is allowed to delete, otherwise false.
   */
  isAllowToDelete = (route) => {
    const ability = toObject(
      abilities.filter((a) => a.route === route && a.ability.includes('delete'))
    )?.ability;
    return this.hasPermission(ability);
  };

  /**
   * Check if the user is allowed to view an item on a specific route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the user is allowed to view, otherwise false.
   */
  isAllowToView = (route) => {
    const ability = toObject(
      abilities.filter((a) => a.route === route && a.ability.includes('view'))
    )?.ability;
    return this.hasPermission(ability);
  };

  /**
   * Check if the user is allowed to manage a specific ability.
   * @param {string} ability - The ability to check.
   * @returns {boolean} - True if the user is allowed to manage, otherwise false.
   */
  isAllowToManage = (ability) => {
    return this.hasPermission(ability);
  };

  /**
   * Check if the user is allowed to send an item on a specific route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the user is allowed to send, otherwise false.
   */
  isAllowToSend = (route) => {
    const ability = toObject(
      abilities.filter((a) => a.route === route && a.ability.includes('send'))
    )?.ability;
    return this.hasPermission(ability);
  };
}

// Export an instance of the Permission service
export const PermissionService = new Service();
