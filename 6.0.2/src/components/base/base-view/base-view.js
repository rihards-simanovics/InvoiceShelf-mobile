import React from 'react';
import {View as RNView} from 'react-native';
import {getClass} from 'utils/class-styled';
import {IProps} from './type.d';

/**
 * BaseView is a customizable view component that conditionally renders its children
 * based on the `show` prop and applies styling based on the provided class and style props.
 *
 * @param {IProps} props - The properties for the BaseView component.
 * @returns {JSX.Element | null} The rendered view component or null if not shown.
 */
export const BaseView = (props: IProps) => {
  const {show = true} = props;

  // Return null if the view should not be displayed
  if (!show) {
    return <React.Fragment />;
  }

  const styleClass = getClass(props, props.class);
  const styles = [styleClass, props.style];

  return (
    <RNView {...props} style={styles}>
      {props.children}
    </RNView>
  );
};
