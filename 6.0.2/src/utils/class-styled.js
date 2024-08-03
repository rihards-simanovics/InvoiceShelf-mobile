import {hasObjectLength, hasTextLength as hasValue} from '@/constants';
import {isAndroidPlatform, isIosPlatform, isIPhoneX} from '@/helpers/platform';
import {SCREEN_HEIGHT} from '@/helpers/size';
import properties from '../helpers/styled';

/**
 * Formats the property name by removing platform-specific prefixes.
 *
 * @param {string} property - The property name to format.
 * @returns {string} - The formatted property name.
 */
function formattedPropertyName(property) {
  if (property.includes('ios:')) {
    return property.split('ios:').pop();
  }

  if (property.includes('and:')) {
    return property.split('and:').pop();
  }

  if (property.includes('xl:')) {
    return property.split('xl:').pop();
  }

  if (property.includes('lg:')) {
    return property.split('lg:').pop();
  }

  if (property.charAt(0) === '-') {
    return property.substring(1);
  }

  return property;
}

/**
 * Gets the actual value of a property, adjusting for negative values and units.
 *
 * @param {string} property - The property name.
 * @param {string} value - The value associated with the property.
 * @returns {string|number} - The formatted property value.
 */
function formattedPropertyValue(property, value) {
  const isNegative = property.charAt(0) === '-';

  if (property.includes('font-weight')) {
    return `${value}`;
  }

  let propertyValue: any = parseFloat(value);

  if (isNegative) {
    propertyValue = -propertyValue;
  }

  if (value.includes('%')) {
    propertyValue = `${propertyValue}%`;
  }

  return propertyValue;
}

/**
 * Checks if a style property is allowed to be applied based on platform and screen size.
 *
 * @param {string} property - The property to check.
 * @returns {boolean} - Returns true if the property can be applied, otherwise false.
 */
function isAllowToApply(property) {
  if (!property) {
    return false;
  }

  if (property.includes('ios:') && !isIosPlatform) {
    return false;
  }

  if (property.includes('and:') && !isAndroidPlatform) {
    return false;
  }

  if (property.includes('lg:') && SCREEN_HEIGHT < 775) {
    return false;
  }

  if (property.includes('xl:') && !isIPhoneX()) {
    return false;
  }

  return true;
}

/**
 * Splits a property string into its name and value components.
 *
 * @param {string} prop - The property string to split.
 * @returns {{property: string, value: string}} - An object containing the property name and value.
 */
function splitPropertyAndValue(prop) {
  const split = prop.split('-');
  const property = split.slice(0, -1).join('-');
  const value = split[split.length - 1];

  return {property, value};
}

/**
 * Returns the dynamic style for a given property if allowed.
 *
 * @param {string} prop - The property string to process.
 * @returns {Object} - The resulting style object.
 */
function getDynamicStyle(prop) {
  const {property, value} = splitPropertyAndValue(prop);
  const isAllow = isAllowToApply(property);

  if (!isAllow) {
    return {};
  }

  const propertyName = formattedPropertyName(property);
  const propertyValue = formattedPropertyValue(property, value);
  let style = properties?.[propertyName] ?? {};

  for (const key in style) style = {[key]: propertyValue};

  return style;
}

/**
 * Binds a style property to the given props if it exists.
 *
 * @param {Object} props - The props object to check against.
 * @param {string} property - The property string to bind.
 * @returns {Object} - The resulting style object or an empty object.
 */
function bindStyle(props, property) {
  const key = property.substring(1);

  if (!props.hasOwnProperty(key)) {
    return {};
  }

  return {[key]: props?.[key]};
}

/**
 * Retrieves the style for a given property based on the provided props.
 *
 * @param {Object} props - The props object to use for style binding.
 * @param {string} property - The property string to retrieve the style for.
 * @returns {Object} - The resulting style object or an empty object.
 */
function getStyle(props, property) {
  if (property.charAt(0) === ':') {
    return bindStyle(props, property);
  }

  const isAllow = isAllowToApply(property);

  if (!isAllow) {
    return {};
  }

  const style = properties?.[formattedPropertyName(property)];

  if (!hasObjectLength(style)) {
    return getDynamicStyle(property);
  }

  return style;
}

/**
 * Main function to get the combined styles based on the provided style class.
 *
 * @param {Object} props - The props object to use for style binding.
 * @param {string} styleClass - The class string containing styles to apply.
 * @returns {Object} - The combined styles object.
 */
export const getClass = (props, styleClass) => {
  if (!hasValue(styleClass)) {
    return {};
  }

  let styles = {};

  styleClass
    .trim()
    .split(' ')
    .map((key) => {
      const style = getStyle(props, key);
      if (style) {
        styles = {...styles, ...style};
      }
    });

  return styles;
};
