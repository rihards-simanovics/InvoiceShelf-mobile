import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {StyleProp, ViewStyle} from 'react-native';
import {DATE_FORMAT} from '@/constants';
import {isIosPlatform, majorVersionIOS} from '@/helpers/platform';
import {commonSelector} from 'stores/common/selectors';
import {BaseSelect} from '@/components';
import {ITheme} from '@/interfaces';

/**
 * DatePicker component that allows users to select a date.
 */
class DatePicker extends Component<IProps, IStates> {
  pickerDateValue: any;
  displayValue: any;

  constructor(props) {
    super(props);
    this.pickerDateValue = new Date();
    this.displayValue = null;
    this.state = {
      isDateTimePickerVisible: false,
      value: '',
      displayMode: null,
    };
  }

  static defaultProps = {
    formDateFormat: DATE_FORMAT,
  };

  componentDidMount() {
    this.setVersionCompatiblePicker();
    this.setInitialDateValue();
  }

  /**
   * Sets the initial date value based on props.
   */
  setInitialDateValue = () => {
    const {
      input: {value, onChange},
      dateFormat,
      selectedDate,
      selectedDateValue,
      formDateFormat,
    } = this.props;

    if (selectedDate && !value === false) {
      this.setState({value: selectedDate});
      this.pickerDateValue = selectedDate;
      onChange?.(selectedDateValue);
    } else {
      if (value) {
        let displayDate = moment(value).format(dateFormat);
        let formDate = moment(value).format(formDateFormat);

        this.setState({value: displayDate});
        onChange?.(formDate);
        this.pickerDateValue = formDate;
      }
    }
  };

  /**
   * Sets the display mode of the date picker based on the platform and version.
   */
  setVersionCompatiblePicker = () => {
    if (isIosPlatform && majorVersionIOS >= 14) {
      this.setState({displayMode: 'spinner'});
      return;
    }

    if (isIosPlatform) {
      this.setState({displayMode: 'inline'});
      return;
    }

    this.setState({displayMode: 'default'});
  };

  /**
   * Toggles the visibility of the date time picker.
   */
  showHideDateTimePicker = () => {
    const {isDateTimePickerVisible} = this.state;
    this.setState({isDateTimePickerVisible: !isDateTimePickerVisible});
  };

  /**
   * Handles the date picked event.
   *
   * @param {Date} date - The selected date.
   */
  handleDatePicked = (date) => {
    const {
      onChangeCallback,
      dateFormat,
      input: {onChange},
      filter,
      formDateFormat,
    } = this.props;

    let displayDate = moment(date).format(dateFormat);
    let formDate = moment(date).format(formDateFormat);

    isIosPlatform
      ? this.setState({value: displayDate})
      : (this.displayValue = displayDate);

    this.pickerDateValue = formDate;

    this.showHideDateTimePicker();

    onChange?.(formDate);

    if (filter) {
      onChangeCallback && onChangeCallback(formDate, displayDate);
    } else {
      onChangeCallback && onChangeCallback(formDate);
    }
  };

  /**
   * Retrieves the formatted date.
   *
   * @param {moment.Moment} displayValue - The moment object to format.
   * @returns {string | null} The formatted date or null.
   */
  getDate = (displayValue) => {
    const {dateFormat} = this.props;
    if (displayValue) {
      return displayValue.format(dateFormat);
    }
    return null;
  };

  /**
   * Gets the options for the date picker.
   *
   * @returns {Object} The date picker options.
   */
  getPickerOption = () => {
    const {displayValue} = this.props;
    const dateValue = displayValue || this.pickerDateValue;

    if (dateValue) {
      try {
        return {date: new Date(dateValue)};
      } catch (e) {
        return {};
      }
    }

    return {};
  };

  /**
   * Retrieves the display value for the date picker.
   *
   * @returns {string} The display value.
   */
  getDisplayValue = () => {
    const {displayValue, input} = this.props;

    if (displayValue) {
      return this.getDate(displayValue);
    }

    return input?.value ? this.displayValue ?? this.state.value ?? '' : '';
  };

  render() {
    const {
      label,
      containerStyle,
      meta,
      isRequired = false,
      placeholder = ' ',
      baseSelectProps,
      disabled,
      theme,
    } = this.props;

    const {isDateTimePickerVisible, displayMode} = this.state;

    let pickerOption = this.getPickerOption();

    if (!displayMode) {
      return null;
    }

    return (
      <>
        <BaseSelect
          label={label}
          icon={'calendar-alt'}
          values={this.getDisplayValue()}
          placeholder={placeholder}
          onChangeCallback={() => !disabled && this.showHideDateTimePicker()}
          meta={meta}
          isRequired={isRequired}
          containerStyle={containerStyle}
          disabled={disabled}
          {...baseSelectProps}
        />

        <DateTimePicker
          mode="date"
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.showHideDateTimePicker}
          display={displayMode}
          isDarkModeEnabled={theme?.mode === 'dark'}
          {...pickerOption}
        />
      </>
    );
  }
}

// Redux state mapping
const mapStateToProps = (state) => ({
  dateFormat: state.common?.dateFormat,
  ...commonSelector(state),
});

// Connect the DatePicker component to Redux
export const BaseDatePicker = connect(mapStateToProps)(DatePicker);

// Interface for component props
interface IProps {
  /**
   * Label of date picker view.
   */
  label?: string;

  /**
   * Invoked with the change event as an argument when the value changes.
   */
  onChangeCallback?: () => void;

  /**
   * Styling for main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Display selected date with formatting.
   */
  displayValue?: string;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * Return selected date with formatting.
   */
  formDateFormat?: string;

  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * Selected date format type. YYYY-MM-DD
   */
  dateFormat?: string;

  /**
   * Selected date timestamp.
   */
  selectedDate?: string;

  /**
   * Selected date timestamp formatted value.
   */
  selectedDateValue?: string;

  /**
   * Redux form built-in meta validation events.
   */
  meta?: any;

  /**
   * Showing placeholder text until date not selecting.
   */
  placeholder?: string;

  /**
   * Additional props to pass to the BaseSelect.
   */
  baseSelectProps?: any;

  /**
   * If true, return the selected date timestamp and its value.
   */
  filter?: boolean;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}

// Interface for component state
interface IStates {
  /**
   * If true the modal is showing.
   */
  isDateTimePickerVisible?: boolean;

  /**
   * Selected date value.
   */
  value: string;

  /**
   * The display options.
   */
  displayMode: 'spinner' | 'default' | 'clock' | 'calendar' | any;
}
