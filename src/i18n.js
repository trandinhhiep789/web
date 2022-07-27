import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LangugeDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

i18n
  .use(LangugeDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['en', 'vi'],
    lng: 'vi',
    fallbackLng: 'vi',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },

    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    },

    debug: true
  })

export default i18n
