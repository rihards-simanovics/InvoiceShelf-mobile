import {StyleProp, ViewStyle} from 'react-native';

/**
 * Interface for the properties accepted by the AssetIcon component.
 */
export interface IProps {
  /**
   * Name of the FontAwesome icon.
   */
  name?: string;

  /**
   * Size of the FontAwesome icon.
   */
  size?: number;

  /**
   * Whether to render the icon as solid or outline.
   */
  solid?: boolean;

  /**
   * Color of the FontAwesome icon.
   */
  color?: string;

  /**
   * Styling for the icon container.
   */
  style?: StyleProp<ViewStyle> | any;
}
