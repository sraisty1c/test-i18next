/* eslint-disable @typescript-eslint/no-var-requires */
import i18nDefault from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appStrings } from '../../assets/i18n/appStrings.json';

const i18next: typeof i18nDefault = require('i18next');

i18next.use(initReactI18next).init({
  resources: appStrings,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation', 'help', 'settings'],
});

export default i18next;
