// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['en', 'fr'],
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
      caches: ['cookie'],
      cookieMinutes: 10
    },
    backend: {
      loadPath: '../../../assets/locales/{{lng}}/translation.json'
    },
    react:{
      useSuspense:false,

    }
  })

export default i18n
