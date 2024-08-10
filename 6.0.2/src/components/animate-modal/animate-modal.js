import React from 'react';
import Modal from 'react-native-modal';
import {IProps} from './type.d';
import {SCREEN_HEIGHT} from '@/helpers/size';

/**
 * AnimateModal component that wraps the react-native-modal component
 * to provide animated modal functionality.
 *
 * @param {IProps} props - The properties for the AnimateModal component.
 * @returns {JSX.Element} The rendered modal component.
 */
export const AnimateModal = (props: IProps): JSX.Element => {
  const {onToggle, visible, children, modalProps, style} = props;

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onToggle} // Toggle modal on backdrop press
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onToggle} // Toggle modal on back button press
      style={[{margin: 0, padding: 0}, style]} // Custom styles for the modal
      deviceHeight={SCREEN_HEIGHT * 1.1} // Adjust modal height based on device height
      statusBarTranslucent={true} // Make status bar translucent
      {...modalProps} // Spread additional modal properties
    >
      {children} // Render children inside the modal
    </Modal>
  );
};
