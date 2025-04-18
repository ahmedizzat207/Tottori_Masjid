import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export type Language = "en" | "jp" | "ar";

export function useLanguage() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language as Language;
  
  // Determine if current language is right-to-left
  const isRTL = currentLanguage === "ar";

  const changeLanguage = useCallback((language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    
    // Add or remove RTL class from document
    if (language === "ar") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [i18n]);

  return {
    currentLanguage,
    changeLanguage,
    isRTL,
    t
  };
}
