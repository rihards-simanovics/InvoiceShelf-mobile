import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

/**
 * Props for the FilePicker component.
 */
export interface IProps {
  /**
   * Label of file picker view.
   */
  label?: string;

  /**
   * Styling for main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Invoked with the change event as an argument when the value changes.
   */
  onChangeCallback?: (callback: any) => void;

  /**
   * Additional styling for the main container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the image.
   */
  imageContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show avatar based view.
   */
  hasAvatar?: boolean;

  /**
   * Styles for the container surrounding the loader.
   */
  loadingContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show document based view.
   */
  withDocument?: boolean;

  /**
   * An action to return document availability.
   */
  fileLoading?: (callback: any) => void;

  /**
   * The URL of the currently uploaded document.
   */
  uploadedFileUrl?: string;

  /**
   * The type of the currently uploaded document.
   */
  uploadedFileType?: string;

  /**
   * If true, save the image in the cache.
   */
  showUploadedImageAsCache?: boolean;

  /**
   * If true, the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

/**
 * State interface for the FilePicker component.
 */
export interface IStates {
  /**
   * The path of the currently uploaded image.
   */
  image: string;

  /**
   * The loading indicator for the document.
   */
  loading?: boolean;

  /**
   * The type of action for the uploaded files.
   */
  action: string | 'DOCUMENT' | 'GALLERY' | 'CAMERA';

  /**
   * An array of objects with data for each dropdown option.
   */
  options: Array<any>;
}
