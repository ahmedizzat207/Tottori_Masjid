"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import { BookOpen, Users, Heart } from "lucide-react"

export default function About() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="about" className="section-container bg-mosque-beige-50">
      <div className="container-custom">
        <h2 className="section-title">{t?.about?.title || "About Our Masjid"}</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          {t?.about?.description ||
            "Tottori Masjid serves as a spiritual center for Muslims in Tottori Prefecture. Our mission is to provide a welcoming space for worship, education, and community engagement."}
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? "md:flex md:flex-row-reverse" : ""}`}>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-mosque-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="h-6 w-6 text-mosque-green-700" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-mosque-green-800">
              {t?.about?.history || "History"}
            </h3>
            <p className="text-gray-600 text-center">
              {t?.about?.historyText ||
                "Established in 2005, our masjid has grown from a small prayer room to a full-fledged Islamic center serving the diverse Muslim community in Tottori."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-mosque-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Heart className="h-6 w-6 text-mosque-green-700" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-mosque-green-800">
              {t?.about?.mission || "Mission"}
            </h3>
            <p className="text-gray-600 text-center">
              {t?.about?.missionText ||
                "To provide a place of worship, promote Islamic values, and foster a sense of community among Muslims while building bridges with the wider Japanese society."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-mosque-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="h-6 w-6 text-mosque-green-700" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-mosque-green-800">
              {t?.about?.services || "Services"}
            </h3>
            <p className="text-gray-600 text-center">
              {t?.about?.servicesText ||
                "Daily prayers, Jumu'ah, Ramadan programs, Islamic education for children and adults, marriage services, and community events."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
