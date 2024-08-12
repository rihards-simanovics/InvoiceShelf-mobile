import React from 'react';
import {View, StyleSheet} from 'react-native';
import {fonts} from '@/styles';
import {Text, CurrencyFormat} from '@/components';

/**
 * Component that displays a tax item with a label and formatted amount.
 *
 * @param {Object} props - The component props.
 * @param {string} props.key - Unique key for the component (used for rendering).
 * @param {string} props.currency - The currency symbol to display.
 * @param {Object} props.theme - The theme object for styling.
 * @param {string} props.label - The label for the tax item.
 * @param {number} props.amount - The amount to be formatted and displayed.
 * @returns {JSX.Element} The rendered tax item component.
 */
export const TaxList = ({key, currency, theme, label, amount}) => {
  return (
    <View style={styles.container} key={key}>
      <View>
        <Text darkGray medium style={{marginTop: 6}}>
          {label}
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <CurrencyFormat
          amount={amount}
          currency={currency}
          style={styles.amount(theme)}
        />
      </View>
    </View>
  );
};

// Styles for the TaxList component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: (theme) => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16,
    ...(theme?.mode === 'dark' && {
      fontFamily: fonts.medium,
    }),
  }),
});
