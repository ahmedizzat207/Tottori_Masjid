"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      id="home"
      className="pt-28 pb-20 md:pt-36 md:pb-32 bg-gradient-to-b from-mosque-beige-50 to-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6 hidden md:block">
              <Image
                src="/images/mosque-logo-large.svg"
                alt="Tottori Masjid"
                width={120}
                height={120}
                className="mx-auto md:mx-0"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mosque-green-800 mb-4">{t.hero.title}</h1>
            <p className="arabic-text text-2xl md:text-3xl text-mosque-green-600 mb-6">
              السلام عليكم ورحمة الله وبركاته
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="#prayer-times" className="btn btn-primary w-full sm:w-auto">
                {t.hero.prayerTimesBtn}
              </Link>
              <Link
                href="#contact"
                className="btn bg-white border border-mosque-green-700 text-mosque-green-700 hover:bg-mosque-green-50 w-full sm:w-auto"
              >
                {t.hero.directionsBtn}
              </Link>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-auto">
            <img
              src="https://images.pexels.com/photos/3823542/pexels-photo-3823542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Tottori Masjid"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 right-0 w-64 h-64 bg-mosque-green-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-10 -left-16 w-48 h-48 bg-mosque-beige-100 rounded-full opacity-40 blur-3xl"></div>
    </section>
  )
}
