import React, {useState} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import styled, {css} from 'styled-components/native';
import {ifProp, prop} from 'styled-tools';
import {applyProp, hasProp, getClass} from '@/utils';

/**
 * Button component that animates on press.
 *
 * @param {Object} props - The props for the Button component.
 * @param {ReactNode} props.children - The content to be displayed inside the button.
 * @param {Object} [props.containerStyle] - Additional styles for the container.
 * @param {React.ComponentType} [props.button] - Custom button component to use instead of TouchableOpacity.
 * @param {number} [props.scale] - Scale value for the animation on press.
 * @param {boolean} [props.withHitSlop] - If true, adds hitSlop to the button.
 */
const Button = ({children, ...props}) => {
  const [animatedScale] = useState(new Animated.Value(1));

  /**
   * Toggles the animated scale value.
   *
   * @param {number} toValue - The value to animate to.
   */
  const toggleAnimatedScale = (toValue) => {
    Animated.timing(animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: animatedScale}],
  };

  // Use a custom button component if provided, otherwise default to TouchableOpacity
  let ActionButton = props?.button || TouchableOpacity;

  return (
    <Animated.View style={[animatedStyle, props.containerStyle]}>
      <ActionButton
        activeOpacity={0.7}
        {...props}
        onPressIn={() => toggleAnimatedScale(props?.scale ?? 0.98)}
        onPressOut={() => toggleAnimatedScale(1)}
        {...(props.withHitSlop && {
          hitSlop: {top: 20, left: 20, bottom: 20, right: 20},
        })}
      >
        {children}
      </ActionButton>
    </Animated.View>
  );
};

/**
 * StyledButton component with additional styling based on props.
 */
const StyledButton = styled(Button)`
  ${ifProp(
    'width',
    css`
      width: ${prop('width')};
    `
  )}
  ${ifProp(
    'height',
    css`
      height: ${prop('height')};
    `
  )}
  ${ifProp(
    'marginTop',
    css`
      margin-top: ${prop('marginTop')};
    `
  )}
  ${ifProp(
    'marginBottom',
    css`
      margin-bottom: ${prop('marginBottom')};
    `
  )}
  ${ifProp(
    'background-color',
    css`
      background-color: ${prop('background-color')};
    `
  )}

  ${(props) =>
    hasProp(props, 'radius') &&
    css`
      border-radius: ${applyProp(props, 'radius')};
    `}
  ${(props) =>
    hasProp(props, 'elevation') &&
    css`
      elevation: ${applyProp(props, 'elevation')};
    `}

  ${ifProp(
    'overflow-hidden',
    css`
      overflow: hidden;
    `
  )}
  ${ifProp(
    'justify-center',
    css`
      justify-content: center;
    `
  )}
  ${ifProp(
    'items-center',
    css`
      align-items: center;
    `
  )}
  ${ifProp(
    'flex-row',
    css`
      flex-direction: row;
    `
  )}
  ${ifProp(
    'flex',
    css`
      flex: ${prop('flex')};
    `
  )}
  ${ifProp(
    'border-width',
    css`
      border-width: ${prop('border-width')};
    `
  )}
  ${ifProp(
    'border-color',
    css`
      border-color: ${prop('border-color')};
    `
  )}
  ${ifProp(
    'opacity',
    css`
      opacity: ${prop('opacity')};
    `
  )}
  ${ifProp(
    'paddingVertical',
    css`
      padding-vertical: ${prop('paddingVertical')};
    `
  )}

  /* Margin */
  ${(props) =>
    hasProp(props, 'mx-') &&
    css`
      margin-horizontal: ${applyProp(props, 'mx-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:max-') &&
    css`
      margin-horizontal: ${applyProp(props, 'lg:max-')};
    `}
  ${(props) =>
    hasProp(props, 'my-') &&
    css`
      margin-vertical: ${applyProp(props, 'my-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:my-') &&
    css`
      margin-vertical: ${applyProp(props, 'lg:my-')};
    `}
  ${(props) =>
    hasProp(props, 'mt-') &&
    css`
      margin-top: ${applyProp(props, 'mt-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:mt-') &&
    css`
      margin-top: ${applyProp(props, 'lg:mt-')};
    `}
  ${(props) =>
    hasProp(props, 'mb-') &&
    css`
      margin-bottom: ${applyProp(props, 'mb-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:mb-') &&
    css`
      margin-bottom: ${applyProp(props, 'lg:mb-')};
    `}
  ${(props) =>
    hasProp(props, 'ml-') &&
    css`
      margin-left: ${applyProp(props, 'ml-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:ml-') &&
    css`
      margin-left: ${applyProp(props, 'lg:ml-')};
    `}
  ${(props) =>
    hasProp(props, 'mr-') &&
    css`
      margin-right: ${applyProp(props, 'mr-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:mr-') &&
    css`
      margin-right: ${applyProp(props, 'lg:mr-')};
    `}

  /* Padding */
  ${(props) =>
    hasProp(props, 'px-') &&
    css`
      padding-horizontal: ${applyProp(props, 'px-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:px-') &&
    css`
      padding-horizontal: ${applyProp(props, 'lg:px-')};
    `}
  ${(props) =>
    hasProp(props, 'py-') &&
    css`
      padding-vertical: ${applyProp(props, 'py-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:py-') &&
    css`
      padding-vertical: ${applyProp(props, 'lg:py-')};
    `}
  ${(props) =>
    hasProp(props, 'pt-') &&
    css`
      padding-top: ${applyProp(props, 'pt-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:pt-') &&
    css`
      padding-top: ${applyProp(props, 'lg:pt-')};
    `}
  ${(props) =>
    hasProp(props, 'pb-') &&
    css`
      padding-bottom: ${applyProp(props, 'pb-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:pb-') &&
    css`
      padding-bottom: ${applyProp(props, 'lg:pb-')};
    `}
  ${(props) =>
    hasProp(props, 'pl-') &&
    css`
      padding-left: ${applyProp(props, 'pl-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:pl-') &&
    css`
      padding-left: ${applyProp(props, 'lg:pl-')};
    `}
  ${(props) =>
    hasProp(props, 'pr-') &&
    css`
      padding-right: ${applyProp(props, 'pr-')};
    `}
  ${(props) =>
    hasProp(props, 'lg:pr-') &&
    css`
      padding-right: ${applyProp(props, 'lg:pr-')};
    `}

  ${prop('style')}
`;

/**
 * ButtonView component that renders a StyledButton with additional props.
 *
 * @param {Object} props - The props for the ButtonView component.
 * @param {ReactNode} props.children - The content to be displayed inside the button.
 * @param {Object} [props.class] - Class-related props for styling.
 */
export const ButtonView = (props) => {
  return (
    <StyledButton {...getClass(props.class)} {...props}>
      {props.children}
    </StyledButton>
  );
};
