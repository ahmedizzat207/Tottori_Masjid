"use client"
import Logo from "./Logo"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import Link from "next/link"

export default function Footer() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-mosque-green-950 text-white pt-16 pb-8">
      <div className="container-custom">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? "md:flex md:flex-row-reverse" : ""}`}
        >
          {/* Logo and About */}
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-4 text-mosque-beige-100 text-sm">Tottori Masjid - Islamic Center of Tottori Prefecture</p>
            <div className={`mt-6 flex space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <a
                href="#"
                className="bg-mosque-green-800 hover:bg-mosque-green-700 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="bg-mosque-green-800 hover:bg-mosque-green-700 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 12 2h.315zm-.075 18c-2.416 0-2.784-.012-3.8-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.016-.06-1.384-.06-3.8v-.525c0-2.416.012-2.784.06-3.8.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 3.525c.636-.247 1.363-.416 2.427-.465C8.901 3.013 9.256 3 12 3h.315zm-.075 10.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0-9.5a5.75 5.75 0 110 11.5 5.75 5.75 0 010-11.5zm5.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t?.footer?.links || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#prayer-times" className="text-mosque-beige-100 hover:text-white transition-colors">
                  {t?.nav?.prayerTimes || "Prayer Times"}
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-mosque-beige-100 hover:text-white transition-colors">
                  {t?.nav?.events || "Events"}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-mosque-beige-100 hover:text-white transition-colors">
                  {t?.nav?.about || "About"}
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-mosque-beige-100 hover:text-white transition-colors">
                  {t?.nav?.gallery || "Gallery"}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-mosque-beige-100 hover:text-white transition-colors">
                  {t?.nav?.contact || "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t?.footer?.subscribe || "Subscribe to our newsletter"}</h3>
            <form className="mt-2">
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""}`}>
                <input
                  type="email"
                  placeholder="Email"
                  className={`px-4 py-2 w-full ${
                    isRTL
                      ? "rounded-r-md rounded-l-none focus:outline-none text-gray-900"
                      : "rounded-l-md rounded-r-none focus:outline-none text-gray-900"
                  }`}
                />
                <button
                  type="submit"
                  className={`bg-mosque-green-700 hover:bg-mosque-green-600 px-4 py-2 ${
                    isRTL
                      ? "rounded-l-md rounded-r-none text-white font-medium transition-colors"
                      : "rounded-r-md rounded-l-none text-white font-medium transition-colors"
                  }`}
                >
                  {t?.footer?.subscribeBtn || "Subscribe"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t?.footer?.contact || "Contact Info"}</h3>
            <address className="not-italic">
              <p className="mb-2 text-mosque-beige-100">123 Tottori Street, Tottori City</p>
              <p className="mb-2 text-mosque-beige-100">Tottori Prefecture, Japan 680-0001</p>
              <p className="mb-2 text-mosque-beige-100">Phone: +81 123-456-7890</p>
              <p className="text-mosque-beige-100">Email: info@tottorimasjid.jp</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-mosque-green-800 text-center text-mosque-beige-200 text-sm">
          <p>
            &copy; {currentYear} Tottori Masjid. {t?.footer?.rights || "All Rights Reserved"}.
          </p>
        </div>
      </div>
    </footer>
  )
}
