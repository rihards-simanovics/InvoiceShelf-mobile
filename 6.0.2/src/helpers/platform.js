import {Platform, Dimensions} from 'react-native';

/**
 * Checks if the device is an iPhone X or later models with similar dimensions.
 * @returns {boolean} True if the device is an iPhone X or similar, false otherwise.
 */
export function isIPhoneX() {
  const {height, width} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
}

/**
 * Indicates if the platform is iOS.
 * @type {boolean}
 */
export const isIosPlatform = Platform.OS === 'ios';

/**
 * Indicates if the platform is Android.
 * @type {boolean}
 */
export const isAndroidPlatform = Platform.OS === 'android';

/**
 * Returns a platform-specific parameter.
 * @param {any} ios - The parameter for iOS.
 * @param {any} android - The parameter for Android.
 * @returns {any} The parameter for the current platform.
 */
export const definePlatformParam = (ios, android) =>
  isIosPlatform ? ios : android;

/**
 * The major version of the iOS operating system.
 * @type {number}
 */
export const majorVersionIOS = parseInt(String(Platform.Version), 10);
