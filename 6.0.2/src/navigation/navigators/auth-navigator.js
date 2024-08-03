import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../navigation-routes';
import {navigatorOptions as options} from '../navigation-action';

// Import screens for the auth navigator
import UpdateAppVersion from 'screens/update-app-version';
import {Login, ForgotPassword} from 'screens/auth';
import Endpoint from 'screens/endpoint';
import LostConnection from 'screens/lost-connection';

// Create a stack navigator for authentication-related screens
const AuthStack = createStackNavigator();

/**
 * AuthNavigator component that defines the authentication stack screens.
 *
 * @returns {JSX.Element} The AuthNavigator component.
 */
export const AuthNavigator = (
  <>
    <AuthStack.Screen name={routes.LOGIN} component={Login} />
    <AuthStack.Screen
      name={routes.FORGOT_PASSWORD}
      component={ForgotPassword}
      options={options}
    />
    {/* Settings Navigator */}
    <AuthStack.Screen
      name={routes.UPDATE_APP_VERSION}
      component={UpdateAppVersion}
    />
    <AuthStack.Screen
      name={routes.ENDPOINTS}
      component={Endpoint}
      options={options}
    />
    <AuthStack.Screen
      name={routes.LOST_CONNECTION}
      component={LostConnection}
      options={{gestureEnabled: false}} // Disable gesture navigation for this screen
    />
  </>
);
