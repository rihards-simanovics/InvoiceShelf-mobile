// Import necessary modules from expo-localization and i18n-js
import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

// Import translation files
import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import it from './it.json';
import ar from './ar.json';
import sk from './sk.json';
import ko from './ko.json';
import lv from './lv.json';
import sr from './sr.json';
import sv from './sv.json';
import nl from './nl.json';
import ja from './ja.json';
import vi from './vi.json';
import pt from './pt.json';

// Enable fallbacks for missing translations
Lng.fallbacks = true;

// Set up translations for different languages
Lng.translations = {
  en, // English
  fr, // French
  es, // Spanish
  de, // German
  it, // Italian
  ar, // Arabic
  sk, // Slovak
  ko, // Korean
  lv, // Latvian
  sr, // Serbian
  sv, // Swedish
  nl, // Dutch
  ja, // Japanese
  vi, // Vietnamese
  pt, // Portuguese
};

// Set the locale to the device's locale
Lng.locale = Localization.locale;

/**
 * Class representing the Translation service.
 */
class Translation {
  locale: string;

  /**
   * Create a Translation instance.
   */
  constructor() {
    this.locale = 'en';
  }

  /**
   * Set the locale for translations.
   * @param {string} locale - The locale to set.
   */
  setLocale = (locale: string) => {
    this.locale = locale;
  };

  /**
   * Translate a given title.
   * @param {string} title - The title to translate.
   * @param {object} [options={}] - Additional options for translation.
   * @returns {string} - The translated string.
   */
  t = (title: string, options = {}) => {
    return Lng.t(title, {locale: this.locale, ...options});
  };
}

// Export an instance of the Translation service
export const TranslationService = new Translation();
export default TranslationService.t;
