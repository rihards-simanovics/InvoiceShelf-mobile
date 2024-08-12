import {StyleSheet} from 'react-native';

/**
 * Styles for the CacheImage component.
 */
const styles = StyleSheet.create({
  /**
   * Style for the image.
   * @param {Object} theme - The theme object for styling.
   */
  image: (theme) => ({
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme?.backgroundColor,
  }),

  /**
   * Style for the loader.
   * @param {Object} theme - The theme object for styling.
   */
  loader: (theme) => ({
    backgroundColor: theme?.backgroundColor,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

export default styles;
