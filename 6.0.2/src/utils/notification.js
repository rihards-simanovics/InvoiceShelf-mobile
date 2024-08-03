// Importing necessary modules and components
import {StyleSheet} from 'react-native';
import {showMessage} from '@/components';
import {colors} from '@/styles';
import {fontSizes, fonts} from '@/styles/fonts';
import {isIPhoneX, isIosPlatform} from '@/helpers/platform';
import t from 'locales/use-translation';

// Define the possible message types for notifications
type MessageType =
  | 'none'
  | 'default'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning'
  | 'error';

// Interface for notification properties
interface IProps {
  /** Optional title for the notification */
  title?: string;
  /** The main message to display */
  message: string;
  /** The type of notification (default is 'success') */
  type?: MessageType;
  /** Duration for which the notification is displayed (in milliseconds) */
  duration?: number;
  /** Optional icon type for the notification */
  icon?: MessageType;
}

/**
 * Displays a notification message with specified properties.
 *
 * @param {IProps} params - The properties for the notification.
 */
export const showNotification = ({
  title = null,
  message = null,
  type: _type = 'success',
  duration = 2.5 * 1000,
  ...rest
}: IProps) => {
  if (!message) return; // Exit if no message is provided

  // Function to determine the title of the notification
  const getTitle = () => {
    if (title) return title; // Return provided title
    if (_type === 'success') return t('notification.success'); // Default success title
    if (_type === 'error') return t('notification.error'); // Default error title
  };

  const type = _type === 'error' ? 'danger' : _type; // Map 'error' type to 'danger'
  const icon = {icon: type, style: styles.icon}; // Set icon based on type
  let additionalParams: any = {...styles.bgColor(_type)}; // Get additional styles based on type

  // Show the notification message
  showMessage({
    type,
    duration,
    icon,
    message: getTitle(),
    description: message,
    titleStyle: styles.title(_type),
    descriptionStyle: styles.message(_type),
    floating: true,
    style: styles.notification,
    ...additionalParams,
    ...rest,
  });
};

// Background colors for different notification types
const bgColor = {
  success: colors.success,
  error: colors.danger,
};

// Styles for the notification component
const styles = StyleSheet.create({
  bgColor: (type) => ({
    backgroundColor: bgColor[type], // Set background color based on type
  }),
  notification: {
    ...(isIPhoneX() && {
      marginTop: 5, // Adjust margin for iPhone X
    }),
  },
  title: (type) => ({
    fontFamily: fonts.medium,
    fontSize: fontSizes.h5,
    textAlign: 'left',
    ...(isIosPlatform &&
      type === 'success' && {
        textShadowColor: colors.white,
        textShadowOffset: {width: 0.2, height: 0.2},
        textShadowRadius: 0.4, // Add text shadow for iOS success notifications
      }),
  }),
  message: (type) => ({
    fontFamily: fonts.regular,
    fontSize: fontSizes.h5,
    textAlign: 'left',
    ...(isIosPlatform &&
      type === 'success' && {
        textShadowColor: colors.white,
        textShadowOffset: {width: 0.2, height: 0.2},
        textShadowRadius: 0.1, // Add text shadow for iOS success notifications
      }),
  }),
  icon: {
    marginLeft: 0,
    marginRight: 12, // Set margins for the icon
  },
});
