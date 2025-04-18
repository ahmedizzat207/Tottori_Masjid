"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "./Logo"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-10 transition-transform hover:scale-105 duration-300">
            <Logo variant={isScrolled ? "dark" : "dark"} size="lg" />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-1 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <Link href="/#home" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.home}
            </Link>
            <Link href="/#prayer-times" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.prayerTimes}
            </Link>
            <Link href="/#events" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.events}
            </Link>
            <Link href="/#about" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.about}
            </Link>
            <Link href="/#gallery" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.gallery}
            </Link>
            <Link href="/#contact" className="px-3 py-2 rounded-md hover:bg-mosque-green-50 text-mosque-green-900">
              {t.nav.contact}
            </Link>
            <div className={`ml-2 ${isRTL ? "mr-2 ml-0" : ""}`}>
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-mosque-green-900 hover:bg-mosque-green-50 ml-2"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <nav className="container-custom py-4 flex flex-col">
            <Link
              href="/#home"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/#prayer-times"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.prayerTimes}
            </Link>
            <Link
              href="/#events"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/#about"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/#gallery"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.gallery}
            </Link>
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-mosque-green-50 text-mosque-green-900 rounded-md"
            >
              {t.nav.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
