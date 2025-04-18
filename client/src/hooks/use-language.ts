import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export type Language = "en" | "jp";

export function useLanguage() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = useCallback((language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [i18n]);

  return {
    currentLanguage,
    changeLanguage,
    t
  };
}
