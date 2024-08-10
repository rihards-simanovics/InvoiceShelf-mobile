export type IProps = {
  /**
   * Object of Search-Input props.
   */
  input: Object,

  /**
   * Callback function to be called when the field value changes.
   */
  onChangeCallback: () => void,

  /**
   * Style for the content container.
   */
  containerStyle: Object,

  /**
   * An array of objects containing data for each template.
   */
  templates: Array,

  /**
   * Label for the fake input.
   */
  label: string,

  /**
   * Icon for the fake input.
   */
  icon: string,

  /**
   * Placeholder text for the fake input.
   */
  placeholder: string,

  /**
   * Meta properties for the fake input field.
   */
  meta: Object,

  /**
   * Indicates if the field is disabled.
   */
  disabled: boolean,

  /**
   * Indicates if the field is required.
   */
  isRequired: boolean,
};
