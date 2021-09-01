import React, {Component, useState, useEffect} from 'react';
import {AppState, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from 'styled-components/native';
import {store, persistor} from '@/stores';
import ApplicationNavigator from './navigation/containers';
import {checkOTAUpdate} from './features/authentication/actions';
import {loadFonts, switchTheme} from './constants';
import {Loading} from './components';
import {colors} from './styles';
import {darkTheme, lightTheme} from './theme';
import {TranslationService} from 'locales/use-translation';

console.disableYellowBox = true;
console.warn = () => {};

interface IState {
  theme: any;
}

class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {theme: null};
  }

  componentDidMount() {
    this.switchCurrentTheme(Appearance.getColorScheme());
    store?.dispatch?.(checkOTAUpdate());
    AppState?.addEventListener?.('change', this.handleAppStateChange);

    store?.subscribe?.(() => {
      const state = store?.getState?.();
      const locale = state?.global?.locale;
      TranslationService.setLocale(locale);
    });
  }

  componentWillUnmount() {
    AppState?.removeEventListener?.('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    try {
      if (nextAppState !== 'active') {
        return;
      }

      const newColorScheme = Appearance.getColorScheme();
      const oldColorScheme = this.state?.theme?.mode;

      newColorScheme !== oldColorScheme &&
        this.switchCurrentTheme(newColorScheme);
    } catch (e) {}
  };

  switchCurrentTheme = colorScheme => {
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
        <View style={{flex: 1, position: 'relative'}}>
          <ApplicationNavigator />
        </View>
      </ThemeProvider>
    );
  }
}

export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    loadFonts({afterLoad: () => setFontLoaded(true)});
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
