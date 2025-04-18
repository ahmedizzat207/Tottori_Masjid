"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[language]

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLanguageChange = (lang: "en" | "ja" | "ar") => {
    setLanguage(lang)
    closeDropdown()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{t.languageSwitcher[language]}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} aria-hidden="true"></div>
          <div className="absolute z-20 mt-1 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden min-w-[140px] border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "en"
                    ? "bg-mosque-green-50 text-mosque-green-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t.languageSwitcher.en}
              </button>
              <button
                onClick={() => handleLanguageChange("ja")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "ja"
                    ? "bg-mosque-green-50 text-mosque-green-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t.languageSwitcher.ja}
              </button>
              <button
                onClick={() => handleLanguageChange("ar")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "ar"
                    ? "bg-mosque-green-50 text-mosque-green-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t.languageSwitcher.ar}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
