import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import pt_br from './locales/pt-BR.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'pt-BR': { translation: pt_br },
      pt: { translation: pt_br },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
