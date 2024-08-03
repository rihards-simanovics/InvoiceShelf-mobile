/**
 * Interface representing the props for the navigation component.
 */
export interface IProps {
  /**
   * The authenticated token of the current logged-in user.
   */
  idToken: string;

  /**
   * The current locale of the app.
   */
  locale: string;

  /**
   * Indicates whether the user is logged in or not.
   */
  isLogin: boolean;

  /**
   * API URL of the domain.
   */
  endpointApi: string;

  /**
   * Dispatch change action.
   *
   * @param {object} fun - The action to dispatch.
   */
  dispatch: (fun: object) => void;

  /**
   * Handle future updates.
   */
  checkOTAUpdate: () => void;

  /**
   * Fetch main app data.
   *
   * @param {object} fun - The function to fetch data.
   */
  fetchBootstrap: (fun: object) => void;

  /**
   * An array of objects containing data for each ability.
   */
  abilities: Array<any>;
}
