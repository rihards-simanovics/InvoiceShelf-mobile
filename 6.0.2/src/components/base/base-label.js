import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '../text';
import {commonSelector} from 'stores/common/selectors';
import {ITheme} from '@/interfaces';

/**
 * Label component to display a label for a form field.
 * @param {IProps} props - The component props.
 */
const Label: FC<IProps> = (props) => {
  const {children, theme, isRequired, style, ...rest} = props;

  if (!children) {
    return null;
  }

  return (
    <Text
      h5
      left
      medium={theme?.mode === 'dark'}
      color={theme?.viewLabel?.primaryColor}
      style={{...styles.label, ...style}}
      {...rest}
    >
      {children}
      {isRequired ? <Text danger> *</Text> : null}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingBottom: 7,
  },
});

const mapStateToProps = (state) => commonSelector(state);

/**
 * Connected BaseLabel component.
 */
export const BaseLabel = connect(mapStateToProps)(Label);

/**
 * Props for Label component.
 */
interface IProps {
  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * Styles for the container surrounding the title.
   */
  style?: any;
}
