import {ITheme} from '@/interfaces';

/**
 * Properties for the Empty component.
 */
export interface IProps {
  /**
   * Title of the empty placeholder.
   */
  title?: string;

  /**
   * Description of the empty placeholder.
   */
  description?: string;

  /**
   * Image source for the empty placeholder.
   */
  image?: string;

  /**
   * Title of the button displayed in the empty placeholder.
   */
  buttonTitle?: string;

  /**
   * Function to be called when the button is pressed.
   */
  buttonPress?: () => void;

  /**
   * Active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Current navigation object values.
   */
  route?: any;
}
