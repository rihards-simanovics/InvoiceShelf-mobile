import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {routes} from '../navigation-routes';
import BottomTab from '../navigation-bottom-tab';

// Import screens for the tab navigator
import {Invoices} from 'screens/invoices';
import {Customers} from 'screens/customers';
import {Expenses} from 'screens/expenses';
import {Payments} from 'screens/payments';
import {More} from 'screens/more';

// Import Actions for the tab navigator
import {getActiveMainTab} from '../navigation-action';

// Create stack and tab navigators
const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

/**
 * TabNavigator component that defines the main tab navigation structure.
 *
 * @param {Object} props - The props passed to the component.
 * @returns {JSX.Element} The TabNavigator component.
 */
export const TabNavigator = (props) => (
  <Stack.Screen name={routes.MAIN_TABS}>
    {() => (
      <TabStack.Navigator
        initialRouteName={getActiveMainTab()} // Set the initial route based on active tab
        lazy={true} // Load screens lazily
        backBehavior="history" // Manage back behavior
        tabBar={(options) => <BottomTab {...options} {...props} />} // Custom tab bar
      >
        <TabStack.Screen name={routes.MAIN_INVOICES} component={Invoices} />
        <TabStack.Screen name={routes.MAIN_CUSTOMERS} component={Customers} />
        <TabStack.Screen name={routes.MAIN_PAYMENTS} component={Payments} />
        <TabStack.Screen name={routes.MAIN_EXPENSES} component={Expenses} />
        <TabStack.Screen name={routes.MAIN_MORE} component={More} />
      </TabStack.Navigator>
    )}
  </Stack.Screen>
);
