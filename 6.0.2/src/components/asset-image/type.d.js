import {
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  ImageProps,
} from 'react-native';

/**
 * Interface for the properties accepted by the AssetImage component.
 */
export interface IProps {
  /**
   * Styling for the image container.
   */
  style?: StyleProp<ImageStyle> | any;

  /**
   * If true, the image is fetched from a remote URL.
   */
  uri?: boolean;

  /**
   * Additional props to pass to the Image component.
   */
  imageProps?: ImageProps | any;

  /**
   * The image source (either a remote URL or a local file resource).
   */
  source: ImageSourcePropType | any;
}
