import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './locales/en.json';
import ar from './locales/ar.json'; // example

i18n
  .use( LanguageDetector ) // detects language from browser/localStorage
  .use( initReactI18next ) // passes i18n down to react-i18next
  .init( {
    resources: {
      en: {translation: en},
      ar: {translation: ar},
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: [ 'localStorage', 'navigator' ],
      caches: [ 'localStorage' ],
    },
  } );

export default i18n;