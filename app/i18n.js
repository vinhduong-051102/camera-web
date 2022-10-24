import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import vi from './locales/vi/index';
import en from './locales/en/index';

const Languages = ['en', 'vi'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: {
      vi,
      en,
    },
    fallbackLng: ['vi', 'en'],

    interpolation: {
      escapeValue: false,
    },

    debug: true,
    whitelist: Languages,
  });

export default i18n;
