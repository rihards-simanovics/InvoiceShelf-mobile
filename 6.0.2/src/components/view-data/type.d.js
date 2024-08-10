import {ITheme} from '@/interfaces';

/**
 * Interface for the props of the ViewDataContainer component.
 */
export interface IProps {
  /**
   * Label value of the field.
   */
  label?: string;

  /**
   * Value of the field.
   */
  values?: string;

  /**
   * Indicates if the field is displayed in pairs.
   */
  inPairs?: boolean;

  /**
   * An object containing data for the first field.
   */
  first?: any;

  /**
   * An object containing data for the second field.
   */
  second?: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}
