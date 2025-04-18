"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// Mock events data - in a real app, this would come from an API
const MOCK_EVENTS = [
  {
    id: 1,
    title: {
      en: "Weekly Quran Study",
      ja: "週間クルアーン学習会",
      ar: "دراسة القرآن الأسبوعية",
    },
    date: "2023-05-15",
    time: "19:30 - 21:00",
    location: {
      en: "Main Prayer Hall",
      ja: "メイン礼拝ホール",
      ar: "قاعة الصلاة الرئيسية",
    },
    description: {
      en: "Join us for our weekly Quran study and tafsir session.",
      ja: "毎週のクルアーン学習会とタフシール（解釈）セッションにご参加ください。",
      ar: "انضم إلينا في دراسة القرآن الأسبوعية وجلسة التفسير.",
    },
  },
  {
    id: 2,
    title: {
      en: "Community Iftar",
      ja: "コミュニティイフタール",
      ar: "إفطار جماعي",
    },
    date: "2023-05-20",
    time: "18:30 - 20:30",
    location: {
      en: "Masjid Courtyard",
      ja: "マスジド中庭",
      ar: "ساحة المسجد",
    },
    description: {
      en: "Community iftar dinner during Ramadan. All are welcome.",
      ja: "ラマダン中のコミュニティイフタール（断食明けの食事）。どなたでも歓迎します。",
      ar: "إفطار جماعي خلال شهر رمضان. الجميع مرحب بهم.",
    },
  },
  {
    id: 3,
    title: {
      en: "Islamic History Lecture",
      ja: "イスラム史講義",
      ar: "محاضرة في التاريخ الإسلامي",
    },
    date: "2023-05-25",
    time: "14:00 - 16:00",
    location: {
      en: "Education Center",
      ja: "教育センター",
      ar: "المركز التعليمي",
    },
    description: {
      en: "Learn about the golden age of Islamic civilization.",
      ja: "イスラム文明の黄金時代について学びましょう。",
      ar: "تعرف على العصر الذهبي للحضارة الإسلامية.",
    },
  },
]

export default function Events() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="events" className="section-container">
      <div className="container-custom">
        <h2 className="section-title">{t?.events?.title || "Upcoming Events"}</h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isRTL ? "md:flex md:flex-row-reverse" : ""}`}
        >
          {MOCK_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-mosque-green-800 mb-3">
                  {event.title[language as keyof typeof event.title] || event.title.en}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.description[language as keyof typeof event.description] || event.description.en}
                </p>
                <div className="space-y-2">
                  <div className={`flex items-center text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Calendar className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    <span>
                      {new Date(event.date).toLocaleDateString(
                        language === "en" ? "en-US" : language === "ja" ? "ja-JP" : "ar-SA",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </span>
                  </div>
                  <div className={`flex items-center text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Clock className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    <span>{event.time}</span>
                  </div>
                  <div className={`flex items-center text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <MapPin className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    <span>{event.location[language as keyof typeof event.location] || event.location.en}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#"
            className="inline-block px-6 py-3 bg-mosque-green-700 hover:bg-mosque-green-800 text-white rounded-md transition-colors shadow-sm"
          >
            {t?.events?.viewAll || "View All Events"}
          </Link>
        </div>
      </div>
    </section>
  )
}
