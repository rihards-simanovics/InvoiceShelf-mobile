// Import necessary modules
import {Dimensions} from 'react-native';
import {css} from 'styled-components/native';
import * as Font from 'expo-font';

// Import font files
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from '../assets/fonts/Poppins-Light.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from '../assets/fonts/Poppins-Bold.ttf';

// Get device dimensions
const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

/**
 * Normalize font size based on device width.
 * @param {number} size - The original font size.
 * @returns {number} - The normalized font size.
 */
export const normalize = (size) => Math.round((size * realWidth) / 375);

/**
 * Generate CSS for font size.
 * @param {number} size - The font size.
 * @returns {string} - The CSS for the font size.
 */
export const generateSize = (size) =>
  css`
    font-size: ${size};
  `;

/**
 * Object representing the font sizes used in the application.
 */
export const fontSizes = {
  h1: normalize(36), // Font size for h1
  h2: normalize(32), // Font size for h2
  h3: normalize(22), // Font size for h3
  h4: normalize(16), // Font size for h4
  h5: normalize(14), // Font size for h5
  h6: normalize(12), // Font size for h6
  mediumSize: normalize(18), // Medium font size
  bigMediumSize: normalize(24), // Big medium font size
  biggestSize: normalize(48), // Biggest font size
};

/**
 * Object representing the font families used in the application.
 */
export const fonts = {
  regular: 'Poppins', // Regular font
  light: 'Poppins-light', // Light font
  medium: 'Poppins-medium', // Medium font
  semiBold: 'Poppins-semi-bold', // Semi-bold font
  bold: 'Poppins-bold', // Bold font
};

/**
 * Load custom fonts asynchronously.
 * @param {function} onLoad - Callback function to execute after fonts are loaded.
 */
export const loadFonts = async (onLoad) => {
  await Font.loadAsync({
    Poppins: Poppins,
    'Poppins-light': PoppinsLight,
    'Poppins-medium': PoppinsMedium,
    'Poppins-semi-bold': PoppinsSemiBold,
    'Poppins-bold': PoppinsBold,
  });

  onLoad?.();
};
