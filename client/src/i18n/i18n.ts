import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslations } from "./locales/en";
import { jpTranslations } from "./locales/jp";
import { arTranslations } from "./locales/ar";

const resources = {
  en: {
    translation: enTranslations
  },
  jp: {
    translation: jpTranslations
  },
  ar: {
    translation: arTranslations
  }
};

// Safe access to localStorage in case of SSR
const getStoredLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch (e) {
    return "en";
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
