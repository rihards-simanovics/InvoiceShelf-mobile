import React from 'react';
import {Text as RNText} from 'react-native';
import styled, {css} from 'styled-components/native';
import {ifProp, prop} from 'styled-tools';
import {applyProp, getClass, hasProp} from '@/utils';
import {fonts, fontSizes, colors, generateSize} from '../../styles';

/**
 * Custom Text component that wraps the React Native Text.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered RNText component.
 */
const CTText = ({children, ...props}) => (
  <RNText {...props} allowFontScaling={false}>
    {children}
  </RNText>
);

/**
 * StyledText is a styled version of the CTText component.
 * It applies various styles based on the props provided.
 */
const StyledText = styled(CTText)`
  color: ${colors.secondary}; // Default text color
  text-align: left; // Default text alignment

  ${(props) =>
    !props?.['hide-font'] &&
    css`
      font-family: ${fonts.regular}; // Default font family
    `};

  // Font size styles
  ${ifProp('h6', generateSize(fontSizes.h6))}
  ${ifProp('h5', generateSize(fontSizes.h5))}
  ${ifProp('h4', generateSize(fontSizes.h4))}
  ${ifProp('mediumSize', generateSize(fontSizes.mediumSize))}
  ${ifProp('h3', generateSize(fontSizes.h3))}
  ${ifProp('bigMediumSize', generateSize(fontSizes.bigMediumSize))}
  ${ifProp('h2', generateSize(fontSizes.h2))}
  ${ifProp('h1', generateSize(fontSizes.h1))}
  ${ifProp('biggestSize', generateSize(fontSizes.biggestSize))}

  // Color styles
  ${ifProp(
    'danger',
    css`
      color: ${colors.danger};
    `
  )}
  ${ifProp(
    'primary',
    css`
      color: ${colors.primary};
    `
  )}
  ${ifProp(
    'primaryLight',
    css`
      color: ${colors.primaryLight};
    `
  )}
  ${ifProp(
    'secondary',
    css`
      color: ${colors.secondary};
    `
  )}
  ${ifProp(
    'white',
    css`
      color: ${colors.white};
    `
  )}
  ${ifProp(
    'black',
    css`
      color: ${colors.black};
    `
  )}
  ${ifProp(
    'veryLightGray',
    css`
      color: ${colors.veryLightGray};
    `
  )}
  ${ifProp(
    'gray',
    css`
      color: ${colors.gray};
    `
  )}
  ${ifProp(
    'darkGray',
    css`
      color: ${colors.darkGray};
    `
  )}
  ${ifProp(
    'darkGray2',
    css`
      color: ${colors.darkGray2};
    `
  )}
  ${ifProp(
    'veryDarkGray',
    css`
      color: ${colors.veryDarkGray};
    `
  )}
  ${ifProp(
    'dark',
    css`
      color: ${colors.dark};
    `
  )}
  ${ifProp(
    'dark2',
    css`
      color: ${colors.dark2};
    `
  )}
  ${ifProp(
    'dark3',
    css`
      color: ${colors.dark3};
    `
  )}

  // Flex and letter-spacing styles
  ${ifProp(
    'flex',
    css`
      flex: ${prop('flex')};
    `
  )}
  ${ifProp(
    'letter-spacing',
    css`
      letter-spacing: ${prop('letter-spacing')};
    `
  )}

  // Theme-based color styles
  ${(props) =>
    props?.theme?.mode === 'light' &&
    props?.lightColor &&
    css`
      color: ${props.lightColor};
    `}

  ${(props) =>
    props?.theme?.mode === 'dark' &&
    props?.darkColor &&
    css`
      color: ${props.darkColor};
    `}

  // Custom color style
  ${ifProp(
    'color',
    css`
      color: ${(props) => props.color};
    `
  )}

  // Width and text alignment styles
  ${ifProp(
    'wide',
    css`
      width: 100%;
    `
  )}
  ${ifProp(
    'left',
    css`
      text-align: left;
    `
  )}
  ${ifProp(
    'center',
    css`
      text-align: center;
    `
  )}
  ${ifProp(
    'right',
    css`
      text-align: right;
    `
  )}

  // Font style and weight styles
  ${ifProp(
    'italic',
    css`
      font-style: italic;
    `
  )}
  ${ifProp(
    'bold',
    css`
      font-family: ${fonts.bold};
    `
  )}
  ${ifProp(
    'normal',
    css`
      font-family: ${fonts.regular};
    `
  )}
  ${ifProp(
    'light',
    css`
      font-family: ${fonts.light};
    `
  )}
  ${ifProp(
    'bold2',
    css`
      font-family: ${fonts.semiBold};
    `
  )}
  ${ifProp(
    'medium',
    css`
      font-family: ${fonts.medium};
    `
  )}
  ${ifProp(
    'font-weight-600',
    css`
      font-weight: 600;
    `
  )}

  // Text transformation styles
  ${ifProp(
    'upperCase',
    css`
      text-transform: uppercase;
    `
  )}
  ${ifProp(
    'lowercase',
    css`
      text-transform: lowercase;
    `
  )}
  ${ifProp(
    'capitalize',
    css`
      text-transform: capitalize;
    `
  )}

  // Positioning styles
  ${ifProp(
    'positionAbsolute',
    css`
      position: absolute;
    `
  )}

  // Border styles
  ${(props) =>
    hasProp(props, 'border-width') &&
    css`
      border-width: ${applyProp(props, 'border-width')};
    `}

  ${ifProp(
    'border-color',
    css`
      border-color: ${prop('border-color')};
    `
  )}

  // Opacity style
  ${ifProp(
    'opacity',
    css`
      opacity: ${prop('opacity')};
    `
  )}

  /* Margin styles */
  ${(props) =>
    hasProp(props, 'mx-') &&
    css`
      margin-horizontal: ${applyProp(props, 'mx-')};
    `}

  ${(props) =>
    hasProp(props, 'my-') &&
    css`
      margin-vertical: ${applyProp(props, 'my-')};
    `}

  ${(props) =>
    hasProp(props, 'mt-') &&
    css`
      margin-top: ${applyProp(props, 'mt-')};
    `}

  ${(props) =>
    hasProp(props, 'mb-') &&
    css`
      margin-bottom: ${applyProp(props, 'mb-')};
    `}

  ${(props) =>
    hasProp(props, 'ml-') &&
    css`
      margin-left: ${applyProp(props, 'ml-')};
    `}

  ${(props) =>
    hasProp(props, 'mr-') &&
    css`
      margin-right: ${applyProp(props, 'mr-')};
    `}

  /* Padding styles */
  ${(props) =>
    hasProp(props, 'px-') &&
    css`
      padding-horizontal: ${applyProp(props, 'px-')};
    `}

  ${(props) =>
    hasProp(props, 'py-') &&
    css`
      padding-vertical: ${applyProp(props, 'py-')};
    `}

  ${(props) =>
    hasProp(props, 'pt-') &&
    css`
      padding-top: ${applyProp(props, 'pt-')};
    `}

  ${(props) =>
    hasProp(props, 'pb-') &&
    css`
      padding-bottom: ${applyProp(props, 'pb-')};
    `}

  ${(props) =>
    hasProp(props, 'pl-') &&
    css`
      padding-left: ${applyProp(props, 'pl-')};
    `}

  ${(props) =>
    hasProp(props, 'pr-') &&
    css`
      padding-right: ${applyProp(props, 'pr-')};
    `}

  ${prop('style')} // Additional styles passed through props
`;

/**
 * Text component that renders a StyledText with additional props.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered StyledText component.
 */
export const Text = (props) => {
  return (
    <StyledText {...getClass(props.class)} {...props}>
      {props.children}
    </StyledText>
  );
};
