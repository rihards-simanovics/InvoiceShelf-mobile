import {StyleProp, ViewStyle} from 'react-native';

/**
 * Props interface for the CurrencyFormat component.
 */
export interface IProps {
  /**
   * Styling for the main container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * The price of an active item.
   */
  amount: number;

  /**
   * Selected company currency.
   */
  currency: any;

  /**
   * The text to show on the left side of the currency.
   */
  preText: string;

  /**
   * Additional styling for the main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;
}
