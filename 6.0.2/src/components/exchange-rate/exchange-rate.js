import React, {Component} from 'react';
import {View, BaseLabel, BaseInput, Text, AssetSvg} from '@/components';
import {IProps, IStates} from './type.d.js';
import {keyboardType} from '@/helpers/keyboard.js';
import {Field} from 'redux-form';
import t from 'locales/use-translation';
import {colors} from '@/styles/colors.js';
import {TouchableOpacity, Animated} from 'react-native';
import {RefreshIcon} from '@/icons/refresh-icon.js';
import {styles} from './exchange-rate-styles.js';

// Hit slop for touchable elements to increase touchable area
const hitSlop = {top: 20, left: 25, bottom: 20, right: 25};

// Spin animation options
const SPIN_OPTION = {START: 'start', STOP: 'stop'};

/**
 * ExchangeRateField component for displaying and managing exchange rates.
 */
export class ExchangeRateField extends Component<IProps, IStates> {
  spinValue: Animated.Value;

  constructor(props: IProps) {
    super(props);
    this.spinValue = new Animated.Value(0); // Initialize spin animation value
    this.state = {refreshing: false}; // Initial state
  }

  /**
   * Handles the refresh action to update the exchange rate.
   */
  onRefresh = () => {
    const {refreshing} = this.state;
    const {
      setExchangeRate,
      state: {currency},
    } = this.props;

    if (refreshing) return; // Prevent multiple refreshes
    this.spinAnimation(SPIN_OPTION.START); // Start spin animation
    this.toggleRefreshing(true); // Set refreshing state to true

    const onResult = () => {
      setTimeout(() => {
        this.toggleRefreshing(false); // Stop refreshing state
        this.spinAnimation(SPIN_OPTION.STOP); // Stop spin animation
      }, 500);
    };

    setExchangeRate(currency, onResult); // Call the function to set exchange rate
  };

  /**
   * Manages the spin animation based on the provided status.
   * @param status - The status to determine whether to start or stop the animation.
   */
  spinAnimation = (status: string) => {
    if (status === SPIN_OPTION.STOP) {
      this.spinValue.setValue(0); // Reset spin value
      return;
    }

    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start(); // Start the spin animation
  };

  /**
   * Toggles the refreshing state.
   * @param status - The new refreshing status.
   */
  toggleRefreshing = (status: boolean) => this.setState({refreshing: status});

  render() {
    const {
      props: {currency, isEditScreen, isAllowToEdit, theme},
      state: {hasProvider},
    } = this.props;

    const disabled = !isAllowToEdit; // Determine if editing is allowed
    const baseCurrency = currency?.code; // Base currency code
    const selectedCurrency = this.props.state?.currency?.code; // Selected currency code

    // Interpolate spin value for rotation animation
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View flex={1} flex-column justify-center>
        <View flex={1} flex-row justify-between mr-10>
          <BaseLabel mt-9 style={styles.label} isRequired>
            {t('exchange_rate.label')}
          </BaseLabel>
          {isEditScreen && hasProvider && (
            <View justify-end>
              <TouchableOpacity
                onPress={this.onRefresh}
                hitSlop={hitSlop}
                style={styles.refresh}
              >
                <Animated.View style={{transform: [{rotate: spin}]}}>
                  <AssetSvg name={RefreshIcon} width={18} height={18} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View flex={1} flex-row>
          <View flex={0.34} justify-between>
            <Field
              name="currency_code"
              component={BaseInput}
              inputProps={{
                value: t('exchange_rate.selected_currency', {selectedCurrency}),
              }}
              inputContainerStyle={styles.codeContainer}
              disabledStyle={disabled ? {} : styles.codeDisable(theme)}
              textStyle={styles.codeText(theme)}
              disabled
            />
          </View>
          <View flex={1} justify-between>
            <Field
              name="exchange_rate"
              component={BaseInput}
              rightSymbol={baseCurrency}
              keyboardType={keyboardType.DECIMAL}
              inputContainerStyle={styles.reteContainer}
              disabled={disabled}
            />
          </View>
        </View>
        <Text mb-4 h6 style={styles.description} darkGray>
          {t('exchange_rate.exchange_help_text', {
            selectedCurrency,
            baseCurrency,
          })}
        </Text>
      </View>
    );
  }
}
