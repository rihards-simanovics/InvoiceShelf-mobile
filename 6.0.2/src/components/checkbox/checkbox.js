import React, {Component} from 'react';
import {CheckBox as RNCheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';
import {BaseLabel} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {IProps} from './type.d';

/**
 * BaseCheckBox component that renders a checkbox with a label and hint.
 */
class BaseCheckBox extends Component<IProps> {
  /**
   * Toggles the checked state of the checkbox.
   */
  toggleChecked = () => {
    const {
      input: {onChange, value},
      onChangeCallback,
    } = this.props;

    onChange(!value); // Update the checkbox value
    onChangeCallback?.(!value); // Call the optional callback with the new value
  };

  render() {
    const {
      input: {value},
      label = '',
      containerStyle,
      checkBoxProps,
      disabled = false,
      hint,
      hintStyle,
      labelStyle,
      theme,
    } = this.props;

    return (
      <>
        <BaseLabel mt-10 style={hintStyle}>
          {hint}
        </BaseLabel>
        <RNCheckBox
          title={label}
          titleProps={{allowFontScaling: false}}
          checked={value || false}
          size={25}
          onPress={this.toggleChecked}
          containerStyle={[
            styles.container,
            containerStyle && containerStyle,
            disabled && styles.disabledCheckbox,
          ]}
          textStyle={[styles.label(theme), labelStyle]}
          checkedColor={colors.primaryLight}
          uncheckedColor={theme.viewLabel.secondaryColor}
          disabled={disabled}
          activeOpacity={0.4}
          {...checkBoxProps}
        />
      </>
    );
  }
}

// Styles for the BaseCheckBox component
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginVertical: -2,
  },
  disabledCheckbox: {
    opacity: 0.6, // Reduce opacity for disabled checkboxes
  },
  label: (theme) => ({
    fontWeight: 'normal',
    fontFamily: fonts.regular,
    fontSize: 15,
    marginLeft: 5,
    color: theme.text.secondaryColor,
    textAlign: 'left',
  }),
});

// Map Redux state to props
const mapStateToProps = (state) => commonSelector(state);

// Connect the BaseCheckBox to the Redux store
export const CheckBox = connect(mapStateToProps)(BaseCheckBox);
