/**
 * Interface for component props.
 */
export interface IProps {
  /**
   * Props object from parent props.
   */
  props?: Object;

  /**
   * States object from parent props.
   */
  state?: Object;

  /**
   * Function to set the exchange rate.
   * @param fun - The function to set the exchange rate.
   */
  setExchangeRate?: (fun: object) => void;

  /**
   * If true, the user will be able to update the current item data.
   */
  isAllowToEdit: boolean;
}

/**
 * Interface for component state.
 */
export interface IStates {
  /**
   * The loading indicator for the refresh button.
   */
  refreshing?: boolean; // Use 'boolean' instead of 'Boolean' for type consistency
}
