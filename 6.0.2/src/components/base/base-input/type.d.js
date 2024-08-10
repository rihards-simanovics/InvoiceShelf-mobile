/**
 * Interface for the properties of the BaseInput component.
 */
export interface IProps {
  /**
   * Redux form input object containing onChange, onBlur, onFocus, and value.
   */
  input: {
    onChange: () => void,
    onBlur: () => void,
    onFocus: () => void,
    value: string,
  };

  /**
   * Metadata for the input, including error and submission status.
   */
  meta: {
    error: string,
    submitFailed: boolean,
  };

  /**
   * Options for the input, if applicable.
   */
  options: Array<Object>;

  /**
   * Callback for when the input is submitted.
   */
  onSubmitEditing: () => void;

  /**
   * Callback for when the text changes.
   */
  onChangeText: () => void;

  /**
   * Callback for selecting an option, if applicable.
   */
  onSelectOption: () => void;

  /**
   * Callback for setting activity status.
   */
  setActivity: () => void;

  /**
   * Reference function for linking the input.
   */
  refLinkFn: () => void;

  /**
   * Indicates if the input is for dollar amounts.
   */
  dollarField: boolean;

  /**
   * Indicates if the input is for percentage amounts.
   */
  percentageField: boolean;

  /**
   * Indicates if the input is editable.
   */
  editable: boolean;

  /**
   * Indicates if error messages should be hidden.
   */
  hideError: boolean;

  /**
   * Indicates if autocomplete is enabled.
   */
  autocomplete: boolean;

  /**
   * Indicates if the option value should be applied.
   */
  applyOptionValue: boolean;

  /**
   * Indicates if the input is disabled.
   */
  disabled: boolean;

  /**
   * Indicates if the error message should have multiple lines.
   */
  errorNumberOfLines: boolean;

  /**
   * Indicates if the input is required.
   */
  isRequired: boolean;

  /**
   * Indicates if the input should have rounded corners.
   */
  rounded: boolean;

  /**
   * Indicates if the input is for currency values.
   */
  isCurrencyInput: boolean;

  /**
   * Indicates if the input should use secure text entry.
   */
  secureTextEntry: boolean;

  /**
   * Indicates if the light theme should be applied.
   */
  lightTheme: boolean;

  /**
   * Indicates if the input should support multiple lines.
   */
  multiline: boolean;

  /**
   * Indicates if the input should be auto-focused.
   */
  autoFocus: boolean;

  /**
   * Height of the input field.
   */
  height: number;

  /**
   * Maximum length of the input.
   */
  maxLength: number;

  /**
   * Custom styles for the text.
   */
  textStyle: Object;

  /**
   * Custom styles for validation messages.
   */
  validationStyle: Object;

  /**
   * Additional properties for the input.
   */
  inputProps: Object;

  /**
   * Custom styles for the left icon.
   */
  leftIconStyle: Object;

  /**
   * Custom styles for the field.
   */
  fieldStyle: Object;

  /**
   * Custom styles for the hint.
   */
  hintStyle: Object;

  /**
   * Custom styles for the container.
   */
  containerStyle: Object;

  /**
   * Custom styles for the input container.
   */
  inputContainerStyle: Object;

  /**
   * Custom styles for the disabled state.
   */
  disabledStyle: Object;

  /**
   * Custom styles for the input itself.
   */
  inputStyle: Object;

  /**
   * Type of keyboard to use for the input.
   */
  keyboardType: string;

  /**
   * Type of content for the input (e.g., email, password).
   */
  textContentType: string;

  /**
   * Tip or additional information for the input.
   */
  tip: string;

  /**
   * Placeholder text for the input.
   */
  placeholder: string;

  /**
   * Hint text for the input.
   */
  hint: string;

  /**
   * Name of the left icon to display.
   */
  leftIcon: string;

  /**
   * Color of the text in the input.
   */
  textColor: string;

  /**
   * Type of return key to display on the keyboard.
   */
  returnKeyType: string;

  /**
   * Symbol to display on the left side of the input.
   */
  leftSymbol: string;

  /**
   * Callback for handling errors.
   */
  onError: Function;
}
