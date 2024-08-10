import {StyleProp, ViewStyle} from 'react-native';

/**
 * Interface for the props accepted by the AssetSvg component.
 */
export interface IProps {
  /**
   * Name of the SVG icon to be rendered.
   */
  name: string;

  /**
   * Color of the fillable SVG icon.
   */
  fill?: string;

  /**
   * Width of the SVG icon. Can be a number or a string.
   */
  width?: number | string;

  /**
   * Height of the SVG icon. Can be a number or a string.
   */
  height?: number | string;

  /**
   * Additional styling for the icon container.
   */
  style?: StyleProp<ViewStyle> | any;
}
