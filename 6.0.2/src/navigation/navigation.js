import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {routes} from './navigation-routes';
import {TabNavigator} from './navigators/tab-navigator';
import {AuthNavigator} from './navigators/auth-navigator';
import {CommonNavigator} from './navigators/common-navigator';
import {getActiveMainTab, navigateTo, navigationRef} from './navigation-action';
import {isAndroidPlatform} from '@/helpers/platform';
import {IProps} from './navigation-type.d';

// Create a stack navigator
const Stack = createStackNavigator();

/**
 * Main navigation component that handles the app's navigation structure.
 *
 * @param {IProps} props - The props for the navigation component.
 * @returns {JSX.Element} The NavigationContainer with navigators.
 */
export default (props: IProps) => {
  const {isLogin, endpointApi, checkOTAUpdate, fetchBootstrap} = props;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Add keyboard event listeners for Android
    if (isAndroidPlatform) {
      Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
      Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    }

    // Perform initial actions
    initialActions();
    return () => {
      // Cleanup listeners on unmount
      if (isAndroidPlatform) {
        Keyboard.removeAllListeners();
      }
    };
  }, []);

  /**
   * Perform initial actions based on login status.
   */
  const initialActions = async () => {
    if (!isLogin) {
      checkOTAUpdate(); // Check for updates if not logged in
      return;
    }

    const oldActiveTab = getActiveMainTab();
    fetchBootstrap((res) => {
      const activeTab = getActiveMainTab();
      // Navigate to the active tab if it has changed
      if (oldActiveTab !== activeTab) {
        navigateTo({route: activeTab});
      }
      checkOTAUpdate(); // Check for updates after fetching bootstrap
    });
  };

  let Navigators: any;

  // Determine which navigators to render based on login status and endpoint API
  if (isLogin) {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.MAIN_TABS}>
        {TabNavigator({...props, isKeyboardVisible})}
        {CommonNavigator}
      </Stack.Navigator>
    );
  } else if (!endpointApi) {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.ENDPOINTS}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  } else {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>{Navigators}</NavigationContainer>
  );
};
