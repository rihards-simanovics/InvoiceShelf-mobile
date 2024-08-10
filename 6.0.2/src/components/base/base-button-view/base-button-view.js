import React, {useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {getClass} from 'utils/class-styled';
import {IProps} from './type.d';

/**
 * BaseButtonView is a customizable button component that supports scaling animations.
 *
 * @param {IProps} props - The properties for the BaseButtonView component.
 * @returns {JSX.Element | null} The rendered button component or null if not shown.
 */
export const BaseButtonView = (props: IProps) => {
  const {show = true} = props;

  // Return null if the button should not be displayed
  if (!show) {
    return <React.Fragment />;
  }

  const [animatedScale] = useState(new Animated.Value(1));

  /**
   * Toggles the animated scale of the button.
   *
   * @param {number} toValue - The target scale value for the animation.
   */
  const toggleAnimatedScale = (toValue: number) => {
    Animated.timing(animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const styleClass = getClass(props, props.class);
  const styles = [styleClass, props.style];
  const animatedStyle = {
    transform: [{scale: animatedScale}],
  };

  // Determine the action button type, defaulting to TouchableOpacity
  let ActionButton = TouchableOpacity;
  if (props?.button) {
    ActionButton = props.button;
  }

  return (
    <Animated.View
      style={[animatedStyle, getClass(props, props['base-class'])]}
    >
      <ActionButton
        activeOpacity={0.7}
        onPressIn={() => toggleAnimatedScale(props?.scale ?? 0.98)}
        onPressOut={() => toggleAnimatedScale(1)}
        {...(props['with-hitSlop'] && {
          hitSlop: {top: 20, left: 20, bottom: 20, right: 20},
        })}
        {...props}
        style={styles}
      >
        {props.children}
      </ActionButton>
    </Animated.View>
  );
};
