// React and React Native imports
import React, {Component, useState, useEffect} from 'react';
import {AppState, LogBox} from 'react-native';

// Redux and related imports
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Appearance and theme-related imports
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from 'styled-components/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Local imports
import {store, persistor} from '@/stores';
import {ApplicationNavigator} from './navigation';
import {switchTheme} from './constants';
import {colors, loadFonts} from './styles';
import {darkTheme} from './theme/dark';
import {lightTheme} from './theme/light';
import {FlashMessage, Loading} from '@/components';

// Suppress warnings and logs
console.warn = () => {};
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

/**
 * Interface for the component state.
 */
interface IState {
  theme: any;
}

/**
 * Main application component.
 */
class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {theme: null};
  }

  /**
   * Lifecycle method called after the component is mounted.
   * Sets the initial theme and adds an event listener for app state changes.
   */
  componentDidMount() {
    this.switchCurrentTheme(Appearance.getColorScheme());
    AppState?.addEventListener?.('change', this.handleAppStateChange);
  }

  /**
   * Lifecycle method called before the component is unmounted.
   * Removes the event listener for app state changes.
   */
  componentWillUnmount() {
    AppState?.removeEventListener?.('change', this.handleAppStateChange);
  }

  /**
   * Handles changes in the app state.
   * @param {string} nextAppState - The next state of the app.
   */
  handleAppStateChange = (nextAppState) => {
    try {
      if (nextAppState !== 'active') {
        return;
      }

      const newColorScheme = Appearance.getColorScheme();
      const oldColorScheme = this.state?.theme?.mode;

      if (newColorScheme !== oldColorScheme) {
        this.switchCurrentTheme(newColorScheme);
      }
    } catch (e) {
      // Handle error
    }
  };

  /**
   * Switches the current theme based on the color scheme.
   * @param {string} colorScheme - The current color scheme.
   */
  switchCurrentTheme = (colorScheme) => {
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    this.setState({theme});
    store?.dispatch?.(switchTheme(theme));
  };

  render() {
    const {theme} = this.state;

    if (!theme) {
      return <Loading color={colors.primaryLight} />;
    }

    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <FlashMessage position="top" />
          <ApplicationNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}

/**
 * Root component that sets up the Redux provider and persistence gate.
 */
export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts(() => setFontLoaded(true));
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {fontLoaded && (
          <AppearanceProvider>
            <App />
          </AppearanceProvider>
        )}
      </PersistGate>
    </Provider>
  );
};
