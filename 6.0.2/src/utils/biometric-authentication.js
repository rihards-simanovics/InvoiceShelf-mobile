import * as LocalAuthentication from 'expo-local-authentication';
import t from 'locales/use-translation';
import {alertMe, hasValue} from '@/constants';

/**
 * Displays an alert when biometric authentication fails.
 */
const authenticationFail = () => {
  alertMe({
    title: 'Oops!',
    desc: t('validation.wrong'),
  });
};

/**
 * Props for the biometric authentication function.
 */
interface IProps {
  /** Callback function to be called on successful authentication. */
  onSuccess?: () => void;
  /** Callback function to be called if the user cancels the authentication. */
  onCancel?: () => void;
  /** Callback function to be called on authentication failure. */
  onFail?: () => void;
}

/**
 * Performs biometric authentication using the device's local authentication capabilities.
 *
 * @param {IProps} params - The parameters for the authentication process.
 * @returns {Promise<void>} - A promise that resolves when the authentication process is complete.
 */
export const biometricAuthentication = async ({
  onSuccess,
  onCancel,
  onFail,
}: IProps) => {
  try {
    const result: any = await LocalAuthentication.authenticateAsync({});

    if (result?.success) {
      onSuccess?.();
      return;
    }

    if (hasValue(result?.error) && result?.error.includes('user_cancel')) {
      onCancel?.();
      return;
    }

    onFail?.();
  } catch (e) {
    authenticationFail();
    onFail?.();
  }
};
