// Import necessary modules
import {defineSize, SCREEN_WIDTH} from '@/helpers/size';
import {fonts} from './fonts';

/**
 * Generate styles for the header title.
 * @param {object} params - Parameters for the header title style.
 * @param {number} [params.marginLeft=-7] - Margin left value.
 * @param {number} [params.marginRight=-12] - Margin right value.
 * @param {object} [params.theme=null] - Theme object to determine font family.
 * @returns {object} - The style object for the header title.
 */
export const headerTitle = ({
  marginLeft = -7,
  marginRight = -12,
  theme = null,
}) => {
  return {
    marginLeft: defineSize(marginLeft, marginLeft, marginLeft, 0),
    marginRight: defineSize(marginRight, marginRight, marginRight, 0),
    textAlign: 'center',
    fontFamily: theme?.mode === 'dark' ? fonts.medium : fonts.regular,
    textAlign: 'left',
  };
};

/**
 * Generate styles for item descriptions.
 * @param {number} [widthMinus=43] - Value to subtract from the screen width.
 * @returns {object} - The style object for item descriptions.
 */
export const itemsDescriptionStyle = (widthMinus = 43) => {
  return {
    width: SCREEN_WIDTH - widthMinus,
    textAlign: 'justify',
  };
};
