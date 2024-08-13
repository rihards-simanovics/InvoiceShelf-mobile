import React, {Component} from 'react';
import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

/**
 * Constants for iPad dimensions.
 * @constant {number} PAD_WIDTH - Width of an iPad.
 * @constant {number} PAD_HEIGHT - Height of an iPad.
 */
const PAD_WIDTH = 768; // iPad
const PAD_HEIGHT = 1024; // iPad

const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');

const isAndroid = Platform.OS === 'android';
const isIPhoneX = isIphoneX();

/**
 * Determines if the device is an iPad.
 * @returns {boolean} True if the device is an iPad, false otherwise.
 */
const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  // Check for portrait and landscape orientations
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) return false;
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) return false;

  return true;
})();

/**
 * Checks if the orientation is landscape.
 * @param {Object} dimensions - The dimensions of the device.
 * @returns {boolean} True if landscape, false otherwise.
 */
const isOrientationLandscape = ({width, height}) => width > height;

/**
 * Helper function to get the current status bar height for padding.
 * @param {boolean} [isLandscape=false] - Indicates if the orientation is landscape.
 * @param {number|null|function} [_customStatusBarHeight=null] - Custom status bar height.
 * @returns {number} The calculated status bar height.
 */
export function getFlashMessageStatusBarHeight(
  isLandscape = false,
  _customStatusBarHeight = null
) {
  if (_customStatusBarHeight !== null && _customStatusBarHeight !== false) {
    return typeof _customStatusBarHeight === 'function'
      ? _customStatusBarHeight(isLandscape)
      : +_customStatusBarHeight;
  }

  // Temporary workaround for status bar height detection
  if (isAndroid) {
    return +StatusBar.currentHeight + 6;
  }

  if (isIPhoneX) {
    return isLandscape ? 0 : getStatusBarHeight(true);
  }

  if (isIPad) {
    return 20;
  }

  return isLandscape ? 0 : 20;
}

/**
 * Converts a percentage string to a decimal.
 * @param {string} percent - The percentage string (e.g., "50%").
 * @returns {number} The decimal representation of the percentage.
 */
const doubleFromPercentString = (percent) => {
  if (!percent || !percent.includes('%')) {
    return 0;
  }

  const dbl = parseFloat(percent) / 100;

  return isNaN(dbl) ? 0 : dbl;
};

/**
 * Helper function to apply extra padding to a style.
 * @param {Object} style - The original style object.
 * @param {Object} wrapperInset - The inset values for padding.
 * @param {boolean} [hideStatusBar=false] - If true, hides the status bar.
 * @param {string} [prop='padding'] - The property to apply (padding or margin).
 * @returns {Object} The modified style object with applied insets.
 */
export function styleWithInset(
  style,
  wrapperInset,
  hideStatusBar = false,
  prop = 'padding'
) {
  if (prop === 'margin') {
    return styleWithInsetMargin(style, wrapperInset, hideStatusBar);
  }

  const {width: viewWidth} = Dimensions.get('window');

  let {
    padding = 0,
    paddingVertical = padding,
    paddingHorizontal = padding,
    paddingTop = paddingVertical,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal,
    ...viewStyle
  } = StyleSheet.flatten(style || {});

  // Convert percentage strings to numbers
  if (typeof paddingTop !== 'number') {
    paddingTop = doubleFromPercentString(paddingTop) * viewWidth;
  }

  if (typeof paddingBottom !== 'number') {
    paddingBottom = doubleFromPercentString(paddingBottom) * viewWidth;
  }

  if (typeof paddingLeft !== 'number') {
    paddingLeft = doubleFromPercentString(paddingLeft) * viewWidth;
  }

  if (typeof paddingRight !== 'number') {
    paddingRight = doubleFromPercentString(paddingRight) * viewWidth;
  }

  return {
    ...viewStyle,
    paddingTop:
      !!wrapperInset.isIPhoneX || !hideStatusBar
        ? paddingTop + wrapperInset.insetTop
        : paddingTop,
    paddingBottom: paddingBottom + wrapperInset.insetBottom,
    paddingLeft: paddingLeft + wrapperInset.insetLeft,
    paddingRight: paddingRight + wrapperInset.insetRight,
  };
}

/**
 * Helper function to apply extra margin to a style.
 * @param {Object} style - The original style object.
 * @param {Object} wrapperInset - The inset values for margin.
 * @param {boolean} [hideStatusBar=false] - If true, hides the status bar.
 * @returns {Object} The modified style object with applied margins.
 */
export function styleWithInsetMargin(
  style,
  wrapperInset,
  hideStatusBar = false
) {
  const {width: viewWidth} = Dimensions.get('window');

  let {
    margin = 0,
    marginVertical = margin,
    marginHorizontal = margin,
    marginTop = marginVertical,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    marginRight = marginHorizontal,
    ...viewStyle
  } = StyleSheet.flatten(style || {});

  // Convert percentage strings to numbers
  if (typeof marginTop !== 'number') {
    marginTop = doubleFromPercentString(marginTop) * viewWidth;
  }

  if (typeof marginBottom !== 'number') {
    marginBottom = doubleFromPercentString(marginBottom) * viewWidth;
  }

  if (typeof marginLeft !== 'number') {
    marginLeft = doubleFromPercentString(marginLeft) * viewWidth;
  }

  if (typeof marginRight !== 'number') {
    marginRight = doubleFromPercentString(marginRight) * viewWidth;
  }

  return {
    ...viewStyle,
    marginTop:
      !!wrapperInset.isIPhoneX || !hideStatusBar
        ? marginTop + wrapperInset.insetTop
        : marginTop,
    marginBottom: marginBottom + wrapperInset.insetBottom,
    marginLeft: marginLeft + wrapperInset.insetLeft,
    marginRight: marginRight + wrapperInset.insetRight,
  };
}

/**
 * Utility component wrapper to handle orientation changes and extra padding control for iOS (especially iPads and iPhone X).
 */
export default class FlashMessageWrapper extends Component {
  static defaultProps = {
    /**
     * Default FlashMessage position is "top".
     * Other options like "bottom" and "center" use other extra padding configurations.
     */
    position: 'top',
  };

  static propTypes = {
    position: PropTypes.string,
    children: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.dimensionsSubscription = null;

    this.state = {
      isLandscape: isOrientationLandscape(Dimensions.get('window')),
    };
  }

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener(
      'change',
      this.handleOrientationChange
    );
  }

  componentWillUnmount() {
    if (!!this.dimensionsSubscription) {
      this.dimensionsSubscription.remove();
    }
  }

  /**
   * Handles orientation changes and updates the state.
   * @param {Object} { window } - The new window dimensions.
   */
  handleOrientationChange({window}) {
    const isLandscape = isOrientationLandscape(window);
    this.setState({isLandscape});
  }

  render() {
    const {position, statusBarHeight = null, children} = this.props;
    const {isLandscape} = this.state;

    const _statusBarHeight = getFlashMessageStatusBarHeight(
      isLandscape,
      statusBarHeight
    );

    /**
     * This wrapper will return data about extra inset padding, statusBarHeight, and some device detection like iPhoneX and iPad.
     */
    const wrapper = {
      isLandscape,
      isIPhoneX: isIPhoneX,
      isIPad: isIPad,
      statusBarHeight: _statusBarHeight,
      insetTop: position === 'top' ? _statusBarHeight : 0,
      insetLeft:
        (position === 'top' || position === 'bottom') && isLandscape
          ? isIPhoneX
            ? 21
            : 0
          : 0,
      insetRight:
        (position === 'top' || position === 'bottom') && isLandscape
          ? isIPhoneX
            ? 21
            : 0
          : 0,
      insetBottom:
        isIPhoneX && position === 'bottom'
          ? isLandscape
            ? 24
            : 34
          : isAndroid
          ? 2
          : 0,
    };

    return children(wrapper);
  }
}
