import React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {PermissionService} from '@/services';
import {routes} from './navigation-routes';
import {SCREEN_WIDTH} from '@/helpers/size';

// Default navigator options for stack navigation
export const navigatorOptions = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  gestureResponseDistance: {horizontal: SCREEN_WIDTH * 0.9, vertical: 200},
};

// Reference to the navigation object
export let navigationRef: any = React.createRef();

/**
 * Navigate to a specified route with optional parameters.
 *
 * @param {Object} params - The navigation parameters.
 * @param {string} params.route - The route name to navigate to.
 * @param {Object} [params.params={}] - Optional parameters to pass to the route.
 */
export function navigateTo({route, params = {}}) {
  navigationRef?.current?.navigate?.(route, params);
}

/**
 * Reset the navigation stack to the main tabs.
 */
export function resetNavigation() {
  navigationRef?.current?.dispatch?.(StackActions.replace(routes.MAIN_TABS));
}

/**
 * Go back to the previous screen in the navigation stack.
 */
export function goBack() {
  navigationRef?.current?.goBack?.(null);
}

// Navigation actions
export const navigation = {
  navigateTo,
  goBack,
};

/**
 * Get the active main tab based on user permissions.
 *
 * @returns {string} The route name of the active main tab.
 */
export const getActiveMainTab = () => {
  if (PermissionService.isAllowToView(routes.MAIN_INVOICES)) {
    return routes.MAIN_INVOICES;
  }

  if (PermissionService.isAllowToView(routes.MAIN_CUSTOMERS)) {
    return routes.MAIN_CUSTOMERS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_PAYMENTS)) {
    return routes.MAIN_PAYMENTS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_EXPENSES)) {
    return routes.MAIN_EXPENSES;
  }

  return routes.MAIN_MORE;
};

/**
 * Dismiss a specified route and execute an optional callback.
 *
 * @param {string} route - The route name to dismiss.
 * @param {Function} [callback=null] - Optional callback to execute after dismissing.
 */
export const dismissRoute = (route, callback = null) => {
  navigationRef?.current?.dispatch?.((state) => {
    const filteredRoutes = state.routes.filter((r) => r.name !== route);

    return CommonActions.reset({
      ...state,
      routes: filteredRoutes,
      index: filteredRoutes.length - 1,
    });
  });

  setTimeout(() => callback?.(), 100);
};
