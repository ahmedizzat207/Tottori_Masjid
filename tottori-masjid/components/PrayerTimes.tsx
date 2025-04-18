"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import { Clock, AlarmClock } from "lucide-react"

// Mock prayer times data - in a real app, this would come from an API
const MOCK_PRAYER_TIMES = {
  fajr: "05:12",
  sunrise: "06:43",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:17",
  isha: "19:48",
  jumah: "13:00", // Friday prayer
}

// Helper function to convert time string to minutes
const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number)
  return hours * 60 + minutes
}

// Helper function to convert minutes to time object
const minutesToTime = (minutes: number): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes % 60)
  const seconds = Math.floor((minutes * 60) % 60)
  return { hours, minutes: mins, seconds }
}

export default function PrayerTimes() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayer, setNextPrayer] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)
  const [activeTime, setActiveTime] = useState<string | null>(null)

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Calculate next prayer and countdown
  useEffect(() => {
    const calculateNextPrayer = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentSecond = now.getSeconds()
      const currentTimeInMinutes = currentHour * 60 + currentMinute + currentSecond / 60

      const prayers = [
        { name: "fajr", time: MOCK_PRAYER_TIMES.fajr },
        { name: "sunrise", time: MOCK_PRAYER_TIMES.sunrise },
        { name: "dhuhr", time: MOCK_PRAYER_TIMES.dhuhr },
        { name: "asr", time: MOCK_PRAYER_TIMES.asr },
        { name: "maghrib", time: MOCK_PRAYER_TIMES.maghrib },
        { name: "isha", time: MOCK_PRAYER_TIMES.isha },
      ]

      // Convert prayer times to minutes
      const prayerTimesInMinutes = prayers.map((prayer) => {
        const timeInMinutes = timeToMinutes(prayer.time)
        return {
          name: prayer.name,
          timeInMinutes,
        }
      })

      // Find the next prayer
      let next = prayerTimesInMinutes.find((prayer) => prayer.timeInMinutes > currentTimeInMinutes)

      // If no prayer is found, it means all prayers for today have passed
      if (!next) {
        next = prayerTimesInMinutes[0] // Set to first prayer of next day
      }

      // Calculate time until next prayer
      let minutesUntilNextPrayer = next.timeInMinutes - currentTimeInMinutes
      if (minutesUntilNextPrayer < 0) {
        minutesUntilNextPrayer += 24 * 60 // Add 24 hours if it's the next day
      }

      // Find active prayer (current or most recent)
      const activePrayer = [...prayerTimesInMinutes]
        .reverse()
        .find((prayer) => prayer.timeInMinutes <= currentTimeInMinutes)

      setActiveTime(activePrayer ? activePrayer.name : null)
      setNextPrayer(next.name)

      // Calculate hours, minutes, and seconds for countdown
      const totalSeconds = minutesUntilNextPrayer * 60
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = Math.floor(totalSeconds % 60)

      setCountdown({ hours, minutes, seconds })
    }

    calculateNextPrayer()
    const interval = setInterval(calculateNextPrayer, 1000)
    return () => clearInterval(interval)
  }, [currentTime])

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat(language === "en" ? "en-US" : language === "ja" ? "ja-JP" : "ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentTime)

  // Get prayer name in the current language
  const getLocalizedPrayerName = (prayerKey: string) => {
    if (!t || !t.prayerTimes || !t.prayerTimes[prayerKey as keyof typeof t.prayerTimes]) {
      return prayerKey // Fallback if translation is not available
    }
    return t.prayerTimes[prayerKey as keyof typeof t.prayerTimes]
  }

  // Format countdown for display
  const formatCountdown = (countdown: { hours: number; minutes: number; seconds: number } | null) => {
    if (!countdown) return "--:--:--"
    const { hours, minutes, seconds } = countdown
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <section id="prayer-times" className="section-container bg-mosque-green-50">
      <div className="container-custom">
        <h2 className="section-title">{t?.prayerTimes?.title || "Prayer Times"}</h2>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Date and Next Prayer */}
          <div className="bg-mosque-green-700 text-white p-4 md:p-6">
            <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <div>
                <h3 className="text-xl font-medium">{t?.prayerTimes?.today || "Today"}</h3>
                <p className="text-mosque-beige-100">{formattedDate}</p>
              </div>
              {nextPrayer && (
                <div className={`text-right ${isRTL ? "text-left" : ""}`}>
                  <h3 className="text-xl font-medium">{t?.prayerTimes?.nextPrayer || "Next Prayer"}</h3>
                  <p className="text-mosque-beige-100">
                    {getLocalizedPrayerName(nextPrayer)} -{" "}
                    {MOCK_PRAYER_TIMES[nextPrayer as keyof typeof MOCK_PRAYER_TIMES]}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-mosque-green-800 text-white p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <AlarmClock className="h-5 w-5 text-mosque-beige-200" />
                <p className="text-mosque-beige-100 font-medium">
                  {t?.prayerTimes?.nextPrayer || "Next Prayer"} {nextPrayer && getLocalizedPrayerName(nextPrayer)}
                </p>
              </div>
              <div className="text-4xl font-bold font-mono tracking-wider bg-mosque-green-900/50 px-6 py-2 rounded-lg">
                {formatCountdown(countdown)}
              </div>
            </div>
          </div>

          {/* Prayer Times Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div
              className={`p-4 md:p-6 text-center border-b md:border-r border-gray-100 ${
                activeTime === "fajr" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.fajr || "Fajr"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.fajr}</p>
            </div>
            <div
              className={`p-4 md:p-6 text-center border-b md:border-r border-gray-100 ${
                activeTime === "sunrise" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.sunrise || "Sunrise"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.sunrise}</p>
            </div>
            <div
              className={`p-4 md:p-6 text-center border-b md:border-r border-gray-100 ${
                activeTime === "dhuhr" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.dhuhr || "Dhuhr"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.dhuhr}</p>
            </div>
            <div
              className={`p-4 md:p-6 text-center border-b md:border-r border-gray-100 ${
                activeTime === "asr" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.asr || "Asr"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.asr}</p>
            </div>
            <div
              className={`p-4 md:p-6 text-center border-b md:border-r border-gray-100 ${
                activeTime === "maghrib" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.maghrib || "Maghrib"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.maghrib}</p>
            </div>
            <div
              className={`p-4 md:p-6 text-center border-b border-gray-100 ${
                activeTime === "isha" ? "bg-mosque-green-50" : ""
              }`}
            >
              <h4 className="text-mosque-green-800 font-medium mb-2">{t?.prayerTimes?.isha || "Isha"}</h4>
              <p className="text-2xl font-bold">{MOCK_PRAYER_TIMES.isha}</p>
            </div>
          </div>

          {/* Jumu'ah Time */}
          <div className="p-4 md:p-6 bg-mosque-beige-50 flex items-center justify-center gap-3">
            <Clock className="text-mosque-green-700" />
            <span className="font-medium">
              {t?.prayerTimes?.jumah || "Jumu'ah"}: {MOCK_PRAYER_TIMES.jumah}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
