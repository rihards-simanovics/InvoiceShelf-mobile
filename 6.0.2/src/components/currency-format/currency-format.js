import React, {Component} from 'react';
import {Text} from '../text';
import {View, StyleSheet} from 'react-native';
import {formatMoney} from '@/constants';
import {definePlatformParam} from '@/helpers/platform';
import {IProps} from './type.d';

/**
 * CurrencyFormat component that formats and displays a monetary amount
 * with the specified currency symbol.
 */
export class CurrencyFormat extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {style, amount, currency, preText, containerStyle} = this.props;
    const {symbol, money, swap_currency_symbol} = formatMoney(amount, currency);
    const combinedSymbolStyle = [style && style, SymbolStyle];

    // Determine which component to display first based on currency symbol position
    let firstComponent = swap_currency_symbol ? money : symbol;
    let firstComponentStyle = swap_currency_symbol
      ? style
      : combinedSymbolStyle;
    let secondComponent = swap_currency_symbol ? symbol : money;
    let secondComponentStyle = swap_currency_symbol
      ? combinedSymbolStyle
      : style;

    return (
      <View style={[styles.container, containerStyle]}>
        <Text numberOfLines={1} style={[style, styles.paddingFalse]}>
          {preText && preText}
        </Text>
        <Text
          numberOfLines={1}
          style={[firstComponentStyle, styles.paddingFalse]}
        >
          {`${firstComponent} `}
        </Text>
        <Text
          numberOfLines={1}
          style={[secondComponentStyle, styles.paddingFalse]}
        >
          {secondComponent}
        </Text>
      </View>
    );
  }
}

// Styles for the CurrencyFormat component
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  paddingFalse: {
    includeFontPadding: false,
  },
});

// Default style for currency symbols
export const SymbolStyle = {
  fontFamily: definePlatformParam('Arial', 'sans-serif'),
};
