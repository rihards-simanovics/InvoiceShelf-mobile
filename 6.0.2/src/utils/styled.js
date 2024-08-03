import {hasTextLength} from '@/constants';
import {isMajorScreenHeight} from '@/helpers/size';
import {colors} from '@/styles';

/**
 * Retrieves a property value from props based on a specified prop name.
 *
 * @param {Object} props - The properties object.
 * @param {string} prop - The property name to search for.
 * @returns {number} - The value of the property or 0 if not found.
 */
export const applyProp = (props, prop) => {
  const property = Object.keys(props).filter((k) => k.includes(prop))?.[0];

  if (!property) return 0;

  const split = property.split('-');

  // Return negative value if the property starts with '-' and has a specific format
  if (property.charAt(0) === '-' && split.length === 3) {
    return -split[split.length - 1];
  }

  return split[split.length - 1];
};

/**
 * Retrieves a property value from props and divides it by a specified division factor.
 *
 * @param {Object} props - The properties object.
 * @param {string} prop - The property name to search for.
 * @param {number} [division=100] - The division factor (default is 100).
 * @returns {number} - The divided property value or 0 if not found.
 */
export const applyDivisionProp = (props, prop, division = 100) => {
  const property = Object.keys(props).filter((k) => k.includes(prop))?.[0];

  if (!property) return 0;

  const split: any = property.split('-');
  return split[split.length - 1] / division;
};

/**
 * Retrieves a color value from props based on a specified prop name.
 *
 * @param {Object} props - The properties object.
 * @param {string} prop - The property name to search for.
 * @returns {string} - The corresponding color value.
 */
export const applyColor = (props, prop) => {
  const property = Object.keys(props).filter((k) => k.includes(prop))?.[0];
  const split = property.split('-');
  const color = `${split[0]}${split[1]}`;
  return colors[color];
};

/**
 * Checks if a specific property exists in props, considering screen height.
 *
 * @param {Object} props - The properties object.
 * @param {string} prop - The property name to check for.
 * @returns {boolean} - True if the property exists, false otherwise.
 */
export const hasProp = (props, prop) => {
  // Check for large screen properties
  if (prop.includes('lg:') && !isMajorScreenHeight) {
    return false;
  }
  return Object.keys(props).some(function (k) {
    return k.includes(prop);
  });
};

/**
 * Converts a string of class texts into an object of styles.
 *
 * @param {string} classTexts - The class texts to convert.
 * @returns {Object} - An object representing the styles.
 */
export const getClass = (classTexts) => {
  // Return an empty object if classTexts is not valid
  if (!hasTextLength(classTexts)) {
    return {};
  }

  let styles = {};

  // Split class texts and process each property
  classTexts.split(' ').map((property) => {
    if (property.includes('=')) {
      const split = property.split('=');
      let value = split[1];

      // Convert string 'true'/'false' to boolean
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      styles = {...styles, [split[0]]: value};
      return;
    }

    // Handle flex properties
    if (
      property.includes('flex-') &&
      !isNaN(parseFloat(property.split('flex-')?.[1]))
    ) {
      const split = property.split('-');
      let value = split[1];
      styles = {...styles, [split[0]]: parseFloat(value)};
      return;
    }

    // Default case for boolean styles
    styles = {...styles, [property]: true};
  });

  return styles;
};
