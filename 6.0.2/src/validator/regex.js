/**
 * Regular expression for validating email addresses.
 *
 * This regex checks for a valid email format, including the presence of
 * an '@' symbol, domain name, and proper character usage.
 *
 * @constant {RegExp}
 */
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regular expression for validating URLs.
 *
 * This regex checks for valid URL formats, including both HTTP and HTTPS
 * protocols, as well as optional 'www' subdomain.
 *
 * @constant {RegExp}
 */
export const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

/**
 * Regular expression for validating strings that contain only alphabetic characters.
 *
 * This regex checks that the string consists solely of uppercase and lowercase
 * letters (A-Z, a-z).
 *
 * @constant {RegExp}
 */
export const CHARACTER_ONLY_REGEX = /^[A-Za-z]+$/;

/**
 * Regular expression for validating cron expressions.
 *
 * This regex checks for valid cron format, which consists of five fields
 * representing minute, hour, day of month, month, and day of week.
 *
 * @constant {RegExp}
 */
export const CRON_REGEX =
  /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])) (\*|([0-6]))$/;
