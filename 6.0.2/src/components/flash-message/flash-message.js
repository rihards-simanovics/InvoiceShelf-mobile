import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  Animated,
  Image,
  Text,
  View,
} from 'react-native';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

import FlashMessageManager from './flash-message-manager';
import FlashMessageWrapper, {styleWithInset} from './flash-message-wrapper';

/**
 * The minimum height for the MessageComponent, mainly used in vertical
 * transitions.
 */
const OFFSET_HEIGHT = Platform.OS !== 'ios' ? 60 : 48;

/**
 * The `message` prop is expected to be an object.
 * - `message` (required): The main text of the flash message.
 * - `description` (optional): Additional text displayed below the main message.
 * - `type` (optional): The type of message, which determines its color. Default
 *   options are "success" (green),"warning" (orange), "danger" (red), "info"
 *   (blue), and "default" (gray).
 * - `backgroundColor` (optional): Custom background color for the message.
 * - `color` (optional): Custom text color for the message.
 */
const MessagePropType = PropTypes.shape({
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
}).isRequired;

/**
 * A no-operation function used as a default placeholder.
 */
const noop = () => {};

/**
 * Generates a simple random ID for internal use in the FlashMessage component.
 */
function srid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}-${s4()}`;
}

/**
 * Converts the icon prop value into a detailed internal object.
 */
function parseIcon(icon = 'none') {
  if (!!icon && icon !== 'none') {
    if (typeof icon === 'string') {
      return {icon, position: 'left', style: {}};
    }

    return {position: 'left', style: {}, ...icon};
  }

  return null;
}

/**
 * Converts string positions like "top", "bottom", and "center" into style
 * classes.
 */
export function positionStyle(style, position) {
  if (typeof position === 'string') {
    return [
      style,
      position === 'top' && styles.rootTop,
      position === 'bottom' && styles.rootBottom,
      position === 'center' && styles.rootCenter,
    ];
  }

  return [style, position];
}

/**
 * Global function to display messages anywhere in your app. Pass a `message`
 * object as the first argument to show flash messages.
 *
 * Example:
 * ```tsx
 * showMessage(
 *   {
 *     message: "Contact sent",
 *     description: "Your message was sent * successfully",
 *     type: "success"
 *   }
 * )
 * ```
 *
 * @todo fix `Redundant double negation.sonarlint(javascript:S6509)`
 * perhaps better to use `Boolean()`?
 */
export function showMessage(...args) {
  if (!!FlashMessageManager._enabled) {
    const ref = FlashMessageManager.getCurrent();
    if (!!ref) ref.showMessage(...args);
  }
}

/**
 * Global function to hide messages programmatically anywhere in your app.
 *
 * Example:
 * ```
 *  hideMessage()
 * ```
 */
export function hideMessage(...args) {
  if (!!FlashMessageManager._enabled) {
    const ref = FlashMessageManager.getCurrent();
    if (!!ref) ref.hideMessage(...args);
  }
}

/**
 * Default transition configuration for the FlashMessage component.
 * You can create custom transition configurations with interpolation, just
 * ensure to return a style object with transform options.
 */
export function FlashMessageTransition(animValue, position = 'top') {
  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (position === 'top') {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-OFFSET_HEIGHT, 0],
    });

    return {
      transform: [{translateY}],
      opacity,
    };
  } else if (position === 'bottom') {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [OFFSET_HEIGHT, 0],
    });

    return {
      transform: [{translateY}],
      opacity,
    };
  }

  return {
    opacity,
  };
}

// prettier-ignore
const DefaultIcons = {
  success: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAQAAAAk/gHOAAADSElEQVR42u2ZwUsbQRTGv4IFBbXYtAQFIR5E8A9wrdUmvUgptUVItEd78dyzYMGrCMWznrx5sFfBQ9oaeoiCJGmbapXkoELJRXLQmITslo3R2ezO7szszubkfMe8mffL7Ns3b98A98PN6EEU68iggBJq0OqqoYQCMlhHFD1+Oh/AMnKoNNzaqYIcljEg330MKVQZzo2qIoWYPPezyAs4NyqPWe/uh5CE6hJAl4okhrwALOLKg/tbXWHRnfsu7Epwf6tddIkChHAmEUDXGUIiAMO4kAyg6wLD/DvgB8ANRIgvBs59AtB1zhMTCR8BdCVYAEs+A+hacgIYlJIH2Hli0B7hoAUAug7sAKKeUrFY2o7SEfItArg5wChjuoUAuqatCGkf3PzAZ9vf0maAfqGChE8ZPKqftnZFTX8zwop0gJ94enfk0y1WmhFykgF+3QHo4xPVJmcE6GYWpaIAT0wP+iO10O0mBlNSAX4jYAn2UarlFDFYkwjwx7IDwEtcUm3XiElGGsAhZQcito85Q4wKkgCOKDsQcYizAjErOS78AV+4AP5SAMKOgV4ihjUHszcAHiDOAWB9BBMoO86pEVN7o7cNizZ8lQ6gi4nwzrBgG74JAYxzADAQVERMi7bhOzfAGBeA5hwLKl5bFqZBHFEBrrkAauw34j0TggbwjBOg6Y2wzws0iIQjwCg3QFNeSDmYWTsEDxsQtEyoCABoSJGJq46GMxSILP553AFdq2TqJMPUCvHYXPO4ANAwSSZ3MuuFGeaH4JgwQAWdxgWOmROcIZ4LA2g4Nrd02FPsO2jjLgA0c/snyFVB0yEmXAFUETQvlOSaaIV44QpAQxKU0kJzARHmPAusitA29JBzctSAXXZd4FFHmPvLOuYRQEXYLrLj3Iu8guLh2yNu/3b32hTb9H/iFuASvU4pZq4Fn/VzrES76TPAJrvp146sjwBZtPM0PwPS+8+kDx3gbQH34dQHgFP0iTTCA9IbP2n+HSAxsSERYIMvBmi3UkUJ7ovebqiC2PJ4N7VlPZTFh4J9lwD7UORdFI5gW+hQKmMbI/KvSwOYxx6zQLnGHubFo19kdEDBAnZwgiKq9ThRUUURJ9jBAhR03F/ruxn/ATogMH6gfbG4AAAAAElFTkSuQmCC",
  info: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAQAAAAk/gHOAAAB/0lEQVR42u2ZsYrCQBCG/9JrFQTf4CqjjyF4jYW1voiCFoKIgvEBhKQUEYS0dtcK6UM68wAWwUaPICEmeprJbtzhuP3rf+cjbGZnZ4D/lWV9oIoOFrBgw4OPM3x4sGFhgQ6q+MgzeBEtGHBweSoHBlooyg+vYQ73RfBbuZhDkxe+BhMnQvhQJ5ioiYcvY4xjhvChjhijLALQwF4gfKg9GtnCFzCQED7UAAUqQAkriQCBVihRACrYSQYItEMl/RfIA+AKUUp3BtY5AQRapzkTwxwBAg1fATRTb7XBV0yb1M7m80SUPg/0E94+IU88SVYzwgedJrxTgnf2G0CdlIpFEI6oP0YwScdKBOEC8/F9SLsNewl/j3iLPrhDdeLPtUUrpi3Rr99XRG7O+eC+qElUVu03AwRqxxEMBQhGvCp2yBss8RnTkryDc1ttaxJyfZa75abA7Wawi+WFq7qRfaEIYRHZLUUIVmS3FSHYkd1ThOBFdl8Rgh/Zz4oQzqy+AoOzwOCPYJAXGGRHBneEpghBE6sXxBGceHfOUIBgiNaO4ght0QpaFMG9703qb0bQxV9TYginxx1J5W9KFi9rBv0FWpdlkvBO5HRZKL2mUcI5ktNroryKDviO6SCr48ai78ig+8qiB82iE89iHsFiKsNkNsViQsdkTslkWstkZv131w9xpmDY0IYKPAAAAABJRU5ErkJggg==",
  warning: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAQAAAAk/gHOAAACpUlEQVR42u2ZPUsrQRSGnxgVG0OCgtgJFhYR4y+wshFvpVgrdhb+AEEJKCgoGoxpbNRLUliICEpaW72CQgoLIaSS/IAUIU1yCfeGza75mLOz66Rw3vo958lm5sycGfgZbsYQM6yRIkuOImWqlCmSI0uKNWYY8jN5hCXS5Kl1VJ40S0S8Tx8jSaFL8mYVSBLzLv0sGSqC9A1VyDCrn36EQ0ou0jdU4pARHYAF3jTSN/TGgrv0A+x6kL6hXQakACFuPASo64aQBGCUR48B6npkVP0L+AHwDyKkNgdufQKo61ZlTuz5CFDXXjeAReVQd/yy6U7Zudh5F1CvA3GHNy6oEx12kITgg544vCcCb6IdwLSoFOsglJhujZARTSsdhBqZVgBR4W6oh1Ah+hXhTLi49BBqnDkBhkUHEi8QCgzbAyyLS4wuQo1le4C0AYS0fV/IG0DIN+8XUy5qvT5CjSnLvmoIYdWypwwhpCx71hBC1rLnDCHkLHvREELRspcNIZQte9UQQrWnvkIPzIUeWBE9UBeShhCSln3FEMKKZZ8whDBh2YMuzgs7DoQdF+eFYHOAK3GAd37b9C6OcGX/DfM+N7OtNG9HGBSfoHVVYNB5jD8SV7Y/Nkkr7NHXVmZc2E0dOPwHwm5qvFVLdyEKcuxwH4vcF63b2rFv7KzH2rX38W9CiLe/4ujn9Rv+iFf6O131RJUD7Tuc+8rOaLcLrw3lRflkk+qi3FC5ebz0sSBdqt2+9vHgE8ADfapXwEHufQC4t++M3UaAc48BzgnIXyTWPQRYd/sqM8mzB+mfmdR5Ggqyqfk2tSmbAa1HmFOXL3SnhL17KAyzJTpf5tnyMr1VL2Ik+OiS/IMEMfX172YEiDDHNte88Pn/zfqTF67ZZo6Im6X3M+AvvehZ3bNZqSIAAAAASUVORK5CYII=",
  danger: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAQAAAAk/gHOAAADgUlEQVR42u2Zz0tbQRDHvxq1UmqaoFU8tAgePESMf4EgeBF7qdaz4s2Df4AgTTGWtrEm5oe1IqiYQD2IFyW34sFCawMKOQbEk+QP8BC8xJLa8PLy5u3ubN67uXN7md35ZHd2ZnYXeGw6rR1DmEUKWeRRRAlllFBEHlmkMIshtLtp3I9JpHGFe6FcIY1J+J03H0QC1xLjtXKNBILOmR9GBncM81W5QwbDjZvvRAS3GuarcosIOhsBGMdlA+arcolxPfOtWHbAfFWW0coF8OLQQYCKHMLLAejCqcMAFTlFl/oMuAHwAOFV84EjlwAqcqTiE2EXASoSlgFMkN0usKNhLIFf5PcJcRag4kABLwBEmQDvATxHnowTggwSIwFeCn61jwMPrZuEiNkBDBKhuIBXEkTZelMQtxikETIW1T/ordNRWY6Vuj4+/LToZCiAAJEN9wk9GcQHos93IosGrGpJcsA1RY+pykdC/xupmaxX67AtSFYZEJ8I3U3boqbDrDgl+GcRRYjPhN5XwbhTZtW0cH0jCj5B6WwIR02b84KsKKWmeE0CkJIWujX5YkBhq1GOtipYgqTCmAOG+oxSwKG2WwL3iNt8l8uM+pTZBZ1Ke0N8W1ccL2V0ybJjv6ip55Ks0SmvkYDsGiej5o1uRXYatmurrJGKRscSsxZYwRPywMutKUpG5zK7IholEF6zRynrz0LYZhbW9GeB5wvvBL4Q0fUFzo4ISXZERG9HZB2ZAT5ElhtOaYC3DWzNhNFlWnsJkuaBmBDTRoc+TYCooLz7ojBmn6HukdYLFEC85veoBsQVPLXqe2yAhMLxRAyxZ1Ye0/CBelln+sSYWbXNtoIOMWrCdcZMXKNNjTfErIrVIYjDQS9xmtpgAthBbBOnqV4qqlnvEM4sd4abClut3jGf4odFZ4cOrD3EyTqPbunRTAzhRY44WffYRfcQmUq6mQC1EBSAMNW14IKEeAZgi1kLRP/tsxx5bdQiynIBcrjf2Ne4a9rGGfk9IEu18y7fuM2r3Dzuugiwq3b72owTlwBO0Kx6BezBsQsAx+bMKGtN7B0gky008V8k5hwEmNN9lenHuQPmz9HfyNOQBwsNvk0t8DyAbj7ENV/o4vA591Dow6K0vjTXhYtOmjfiRRAxFCTGC4ghqL7/dVoT/BjBEg6Qw83/N+sb5HCAJYzAr7P1HhvwF5GXIpRNQBinAAAAAElFTkSuQmCC",
};

/**
 * Renders the flash message icon based on the provided icon type.
 * @param {string} icon - The type of icon to display (default is 'success').
 * @param {object} style - Additional styles for the icon.
 * @param {object} customProps - Additional custom properties for the Image
 * component.
 * @returns {JSX.Element|null} - The Image component with the icon or null if
 * the icon type is not found.
 */
export const renderFlashMessageIcon = (
  icon = 'success',
  style = {},
  customProps = {}
) => {
  if (!!DefaultIcons[icon]) {
    return (
      <Image
        style={[styles.flashIcon, style]}
        source={{uri: DefaultIcons[icon]}}
        {...customProps}
      />
    );
  }

  return null;
};

/**
 * Default MessageComponent used in FlashMessage.
 * This component is wrapped in `FlashMessageWrapper` to handle orientation
 * changes and extra inset padding on special devices. For most uses, this
 * component does not need to be changed for custom versions as it is highly
 * customizable.
 */
export const DefaultFlash = React.forwardRef(
  (
    {
      message,
      style,
      textStyle,
      titleStyle,
      descriptionStyle,
      titleProps,
      textProps,
      renderFlashMessageIcon,
      position = 'top',
      statusBarHeight = null,
      renderCustomContent,
      floating = false,
      icon,
      hideStatusBar = false,
      ...props
    },
    ref
  ) => {
    const hasDescription = !!message.description && message.description !== '';
    const iconView =
      !!icon &&
      !!icon.icon &&
      renderFlashMessageIcon(icon.icon === 'auto' ? message.type : icon.icon, [
        icon.position === 'left' && styles.flashIconLeft,
        icon.position === 'right' && styles.flashIconRight,
        icon.style,
      ]);
    const hasIcon = !!iconView;

    return (
      <FlashMessageWrapper
        ref={ref}
        position={typeof position === 'string' ? position : null}
        statusBarHeight={statusBarHeight}
      >
        {(wrapperInset) => (
          <View
            style={styleWithInset(
              [
                styles.defaultFlash,
                position === 'center' && styles.defaultFlashCenter,
                position !== 'center' &&
                  floating &&
                  styles.defaultFlashFloating,
                hasIcon && styles.defaultFlashWithIcon,
                !!message.backgroundColor
                  ? {backgroundColor: message.backgroundColor}
                  : !!message.type &&
                    !!FlashMessage.ColorTheme[message.type] && {
                      backgroundColor: FlashMessage.ColorTheme[message.type],
                    },
                style,
              ],
              wrapperInset,
              !!hideStatusBar,
              position !== 'center' && floating ? 'margin' : 'padding'
            )}
            {...props}
          >
            {hasIcon && icon.position === 'left' && iconView}
            <View style={styles.flashLabel}>
              <Text
                style={[
                  styles.flashText,
                  hasDescription && styles.flashTitle,
                  !!message.color && {color: message.color},
                  titleStyle,
                ]}
                {...textProps}
                {...titleProps}
                allowFontScaling={false}
              >
                {message.message}
              </Text>
              {!!renderCustomContent && renderCustomContent(message)}
              {hasDescription && (
                <Text
                  style={[
                    styles.flashText,
                    !!message.color && {color: message.color},
                    textStyle,
                    descriptionStyle,
                  ]}
                  {...textProps}
                  allowFontScaling={false}
                >
                  {message.description}
                </Text>
              )}
            </View>
            {hasIcon && icon.position === 'right' && iconView}
          </View>
        )}
      </FlashMessageWrapper>
    );
  }
);

DefaultFlash.propTypes = {
  /**
   * Prop type validation for the message object
   */
  message: MessagePropType,
  /**
   * Prop type validation for the icon rendering function
   */
  renderFlashMessageIcon: PropTypes.func,
};

/**
 * @todo Improve comments to help with code rewrite and migration. Comments
 *       above this line have already been re-written
 *
 * ========================== Improved Comments Above ==========================
 *
 *
 *
 *
 *
 */

/**
 * Main component of this package.
 *
 * The FlashMessage component is a global utility for creating customizable
 * flashbars, top notifications, or alerts (with support for iPhone X "notch").
 * You can instantiate and use this component once in your main app screen. For
 * global use, add <FlashMessage /> as the last component in your root main
 * screen.
 *
 * Example:
 * ```
 *   <View style={{ flex: 1 }}>
 *     <YourMainApp />
 *     <FlashMessage />   <--- Add here as the last component
 *   </View>
 * ```
 */
export class FlashMessage extends Component {
  static defaultProps = {
    /**
     * Determines if the instance can be registered as the default/global
     * instance.
     */
    canRegisterAsDefault: true,
    /**
     * Controls if the flash message can be closed on press.
     */
    hideOnPress: true,
    /**
     * `onPress` callback for flash message press.
     */
    onPress: noop,
    /**
     * `onLongPress` callback for flash message long press.
     */
    onLongPress: noop,
    /**
     * Controls if the flash message will be shown with animation.
     */
    animated: true,
    /**
     * Duration of the animation in milliseconds.
     */
    animationDuration: 225,
    /**
     * Controls if the flash message can hide itself after a certain duration.
     */
    autoHide: true,
    /**
     * Duration in milliseconds for which the flash message will be shown if
     * `autoHide` is true.
     */
    duration: 1850,
    /**
     * Controls if the flash message will auto-hide the native status bar.
     * Note: Works well on iOS, but not all Android versions support this.
     */
    hideStatusBar: false,
    /**
     * Custom status bar height to add to the message padding top.
     */
    statusBarHeight: null,
    /**
     * The `floating` prop unsticks the message from the edges and applies some
     * border radius to the component.
     */
    floating: false,
    /**
     * The `position` prop sets the position of the flash message.
     * Expected options: "top" (default), "bottom", "center", or a custom object
     * with { top, left, right, bottom } positions.
     */
    position: 'top',
    /**
     * The `renderCustomContent` prop renders JSX below the title of the flash
     * message.
     * Expects a function that returns JSX.
     */
    renderCustomContent: null,
    /**
     * The `icon` prop sets the graphical icon of the flash message.
     * Expected options: "none" (default), "auto" (guided by `type`), "success",
     * "info", "warning", "danger", or a custom object with icon type/name and
     * position (left or right) attributes,
     * e.g., { icon: "success", position: "right" }.
     */
    icon: 'none',
    /**
     * The `renderFlashMessageIcon` prop sets a custom render function for the
     * message icons.
     */
    renderFlashMessageIcon,
    /**
     * The `transitionConfig` prop sets the transition configuration function
     * used in show/hide animations.
     */
    transitionConfig: FlashMessageTransition,
    /**
     * The `MessageComponent` prop sets the default flash message render
     * component used to show all the messages.
     */
    MessageComponent: DefaultFlash,
  };

  static propTypes = {
    /**
     * Determines if the instance can be registered as the default/global
     * instance
     */
    canRegisterAsDefault: PropTypes.bool,
    /**
     * Controls if the flash message can be closed on press
     */
    hideOnPress: PropTypes.bool,
    /**
     * Callback for when the flash message is shown
     */
    onShow: PropTypes.func,
    /**
     * Callback for when the flash message is hidden
     */
    onHide: PropTypes.func,
    /**
     * Callback for flash message press
     */
    onPress: PropTypes.func,
    /**
     * Callback for flash message long press
     */
    onLongPress: PropTypes.func,
    /**
     * Controls if the flash message will be shown with animation
     */
    animated: PropTypes.bool,
    /**
     * Duration of the animation in milliseconds
     */
    animationDuration: PropTypes.number,
    /**
     * Duration in milliseconds for which the flash message will be shown if
     * `autoHide` is true
     */
    duration: PropTypes.number,
    /**
     * Controls if the flash message can hide itself after a certain duration
     */
    autoHide: PropTypes.bool,
    /**
     * Controls if the flash message will auto-hide the native status bar
     */
    hideStatusBar: PropTypes.bool,
    /**
     * The `floating` prop unsticks the message from the edges and applies some
     * border radius to the component
     */
    floating: PropTypes.bool,
    /**
     * The `position` prop sets the position of the flash message
     */
    position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
    /**
     * The `renderCustomContent` prop renders JSX below the title of the flash
     * message
     */
    renderCustomContent: PropTypes.func,
    /**
     * The `icon` prop sets the graphical icon of the flash message
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * The `renderFlashMessageIcon` prop sets a custom render function for the
     * message icons
     */
    renderFlashMessageIcon: PropTypes.func,
    /**
     * The `transitionConfig` prop sets the transition configuration function
     * used in show/hide animations
     */
    transitionConfig: PropTypes.func,
  };

  /**
   * You can customize the default ColorTheme of this component.
   * Use the `setColorTheme` static method to override the primary colors/types of flash messages.
   */
  static ColorTheme = {
    success: '#5cb85c', // Default color for success messages
    info: '#5bc0de', // Default color for info messages
    warning: '#f0ad4e', // Default color for warning messages
    danger: '#d9534f', // Default color for danger messages
  };

  static setColorTheme = (theme) => {
    FlashMessage.ColorTheme = Object.assign(FlashMessage.ColorTheme, theme);
  };

  constructor(props) {
    super(props);

    this.prop = this.prop.bind(this);
    this.pressMessage = this.pressMessage.bind(this);
    this.longPressMessage = this.longPressMessage.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    if (!this._id) this._id = srid();

    this.state = {
      visibleValue: new Animated.Value(0), // Animation value for visibility
      isHidding: false, // Flag to indicate if the message is hiding
      message: props.message || null, // Initial message state
    };
  }

  componentDidMount() {
    if (this.props.canRegisterAsDefault !== false) {
      FlashMessageManager.register(this);
    }
  }

  componentWillUnmount() {
    if (this.props.canRegisterAsDefault !== false) {
      FlashMessageManager.unregister(this);
    }
  }

  /**
   * Non-public method to get a property from the message or props.
   */
  prop(message, prop) {
    return !!message && prop in message
      ? message[prop]
      : prop in this.props
      ? this.props[prop]
      : null;
  }

  /**
   * Non-public method to check if the message should be animated.
   */
  isAnimated(message) {
    return this.prop(message, 'animated');
  }

  /**
   * Non-public method to handle message press events.
   */
  pressMessage(event) {
    if (!this.state.isHidding) {
      const {message} = this.state;
      const hideOnPress = this.prop(message, 'hideOnPress');
      const onPress = this.prop(message, 'onPress');

      if (hideOnPress) {
        this.hideMessage();
      }

      if (typeof onPress === 'function') {
        onPress(event, message);
      }
    }
  }

  /**
   * Non-public method to handle message long press events.
   */
  longPressMessage(event) {
    if (!this.state.isHidding) {
      const {message} = this.state;
      const hideOnPress = this.prop(message, 'hideOnPress');
      const onLongPress = this.prop(message, 'onLongPress');

      if (hideOnPress) {
        this.hideMessage();
      }

      if (typeof onLongPress === 'function') {
        onLongPress(event, message);
      }
    }
  }

  /**
   * Non-public method to toggle the visibility of the flash message.
   */
  toggleVisibility(visible = true, animated = true, done) {
    const {message} = this.state;

    const position = this.prop(message, 'position');
    const animationDuration = this.prop(message, 'animationDuration');
    const duration = this.prop(message, 'duration');
    const autoHide = this.prop(message, 'autoHide');
    const hideStatusBar = this.prop(message, 'hideStatusBar');

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }

    if (visible) {
      const onShow = this.prop(message, 'onShow') || noop;
      const finish = () => {
        if (!!autoHide && duration > 0) {
          this._hideTimeout = setTimeout(
            () => this.toggleVisibility(false, animated),
            duration
          );
        }

        if (!!done && typeof done === 'function') {
          done();
        }
      };

      this.setState({isHidding: false});
      this.state.visibleValue.setValue(0);

      if (!!onShow && typeof onShow === 'function') {
        onShow(this);
      }

      if (!!hideStatusBar) {
        StatusBar.setHidden(
          true,
          typeof hideStatusBar === 'string' ? hideStatusBar : 'slide'
        );
      }

      if (animated) {
        Animated.timing(this.state.visibleValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(finish);
      } else {
        finish();
      }
    } else {
      const onHide = this.prop(message, 'onHide') || noop;
      const finish = () => {
        this.setState({message: null, isHidding: false});

        if (!!onHide && typeof onHide === 'function') {
          onHide(this);
        }

        if (!!done && typeof done === 'function') {
          done();
        }
      };

      this.setState({isHidding: true});

      if (!!hideStatusBar) {
        StatusBar.setHidden(
          false,
          typeof hideStatusBar === 'string' ? hideStatusBar : 'slide'
        );
      }

      if (animated) {
        Animated.timing(this.state.visibleValue, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(finish);
      } else {
        finish();
      }
    }
  }

  /**
   * Instance ref function to handle showing messages.
   * Pass a `message` object as the first attribute to display a flash message.
   *
   * Example:
   * ```
   * this.refs.YOUR_REF.showMessage({ message: "Contact sent", description: "Your message was sent successfully", type: "success" })
   * ```
   */
  showMessage(message, description = null, type = 'default') {
    if (!!message) {
      let _message = {};
      if (typeof message === 'string') {
        _message = {message, description, type};
      } else if ('message' in message) {
        _message = {description: null, type: 'default', ...message};
      }

      const animated = this.isAnimated(_message);
      this.setState({message: _message}, () =>
        this.toggleVisibility(true, animated)
      );
      return;
    }

    this.setState({message: null, isHidding: false});
  }

  /**
   * Instance ref function to programmatically hide the message.
   *
   * Example:
   * ```
   * this.refs.YOUR_REF.hideMessage()
   * ```
   */
  hideMessage() {
    const animated = this.isAnimated(this.state.message);
    this.toggleVisibility(false, animated);
  }

  render() {
    const {message, visibleValue} = this.state;

    const {
      MessageComponent,
      testID,
      accessible,
      accessibilityLabel,
      ...otherProps
    } = this.props;
    const renderCustomContent = this.prop(message, 'renderCustomContent');
    const renderFlashMessageIcon = this.prop(message, 'renderFlashMessageIcon');
    const style = this.prop(message, 'style');
    const textStyle = this.prop(message, 'textStyle');
    const titleStyle = this.prop(message, 'titleStyle');
    const descriptionStyle = this.prop(message, 'descriptionStyle');
    const titleProps = this.prop(message, 'titleProps');
    const textProps = this.prop(message, 'textProps');
    const floating = this.prop(message, 'floating');
    const position = this.prop(message, 'position');
    const statusBarHeight = this.prop(message, 'statusBarHeight');
    const icon = parseIcon(this.prop(message, 'icon'));
    const hideStatusBar = this.prop(message, 'hideStatusBar');
    const transitionConfig = this.prop(message, 'transitionConfig');
    const animated = this.isAnimated(message);
    const animStyle = animated ? transitionConfig(visibleValue, position) : {};

    return (
      <Animated.View
        style={[
          positionStyle(styles.root, position),
          position === 'center' && !!message && styles.rootCenterEnabled,
          animStyle,
        ]}
      >
        {!!message && (
          <TouchableWithoutFeedback
            onPress={this.pressMessage}
            onLongPress={this.longPressMessage}
            accessible={false}
          >
            <MessageComponent
              position={position}
              floating={floating}
              message={message}
              hideStatusBar={hideStatusBar}
              renderFlashMessageIcon={renderFlashMessageIcon}
              renderCustomContent={renderCustomContent}
              statusBarHeight={statusBarHeight}
              icon={icon}
              style={style}
              textStyle={textStyle}
              titleStyle={titleStyle}
              descriptionStyle={descriptionStyle}
              titleProps={titleProps}
              textProps={textProps}
              accessible={!!accessible}
              testID={testID}
              accessibilityLabel={accessibilityLabel}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    );
  }

  _hideTimeout;
  _id;
}

/**
 * Styles for the FlashMessage component.
 * This includes positioning, layout, and appearance for various elements of the
 * flash message.
 */
const styles = StyleSheet.create({
  root: {
    /**
     * Position the flash message absolutely
     */
    position: 'absolute',
    left: 0,
    right: 0,
    /**
     * Ensure the flash message is on top
     */
    zIndex: 99,
  },
  rootTop: {
    /**
     * Position at the top
     */
    top: 0,
  },
  rootBottom: {
    /**
     * Position at the bottom
     */
    bottom: 0,
  },
  rootCenter: {
    /**
     * Center the content horizontally
     */
    justifyContent: 'center',
    /**
     * Center the content vertically
     */
    alignItems: 'center',
  },
  rootCenterEnabled: {
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  defaultFlash: {
    /**
     * Align items to the start of the container
     */
    justifyContent: 'flex-start',
    /**
     * Vertical padding
     */
    paddingVertical: 15,
    /**
     * Horizontal padding
     */
    paddingHorizontal: 20,
    /**
     * Default background color
     */
    backgroundColor: '#696969',
    /**
     * Minimum height of the flash message
     */
    minHeight: OFFSET_HEIGHT,
  },
  defaultFlashCenter: {
    /**
     * Margin around the flash message
     */
    margin: 44,
    /**
     * Rounded corners
     */
    borderRadius: 8,
    /**
     * Hide overflow content
     */
    overflow: 'hidden',
  },
  defaultFlashFloating: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    /**
     * Rounded corners for floating messages
     */
    borderRadius: 8,
    /**
     * Adjust height for status bar
     */
    minHeight: OFFSET_HEIGHT - getStatusBarHeight(),
  },
  defaultFlashWithIcon: {
    /**
     * Arrange items in a row
     */
    flexDirection: 'row',
  },
  flashLabel: {
    /**
     * Take up available space
     */
    flex: 1,
    /**
     * Arrange items in a column
     */
    flexDirection: 'column',
  },
  flashText: {
    /**
     * Font size for text
     */
    fontSize: 14,
    /**
     * Line height for text
     */
    lineHeight: 18,
    /**
     * Text color
     */
    color: '#fff',
  },
  flashTitle: {
    /**
     * Font size for title
     */
    fontSize: 16,
    /**
     * Bold font weight
     */
    fontWeight: '600',
    /**
     * Margin below the title
     */
    marginBottom: 5,
  },
  flashIcon: {
    /**
     * Tint color for the icon
     */
    tintColor: '#fff',
    marginTop: -1,
    /**
     * Width of the icon
     */
    width: 21,
    /**
     * Height of the icon
     */
    height: 21,
  },
  flashIconLeft: {
    /**
     * Negative margin to the left
     */
    marginLeft: -6,
    /**
     * Margin to the right
     */
    marginRight: 9,
  },
  flashIconRight: {
    /**
     * Negative margin to the right
     */
    marginRight: -6,
    /**
     * Margin to the left
     */
    marginLeft: 9,
  },
});
