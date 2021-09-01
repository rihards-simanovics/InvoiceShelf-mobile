import {INavigation} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * An array of objects with data for each role.
   */
  roles: Array<any>;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;
}

export interface IStates {
  /**
   * Search roles in list data.
   */
  search: string;
}
