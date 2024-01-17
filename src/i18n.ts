import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import pt_br from "./locales/pt_br.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt_br: { translation: pt_br },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n
