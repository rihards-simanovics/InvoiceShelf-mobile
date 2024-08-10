import React from 'react';
import {ModalProps} from 'react-native-modal';
import {StyleProp, ViewStyle} from 'react-native';

/**
 * Interface for the properties accepted by the AnimateModal component.
 */
export interface IProps {
  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => void;

  /**
   * If true, the modal is showing.
   */
  visible?: boolean;

  /**
   * Additional props to pass to the Modal.
   */
  modalProps?: ModalProps | any;

  /**
   * Styling for the modal content container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;
}
