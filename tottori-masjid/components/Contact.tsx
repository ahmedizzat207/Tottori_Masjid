"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="contact" className="section-container bg-mosque-green-50">
      <div className="container-custom">
        <h2 className="section-title">{t?.contact?.title || "Contact Us"}</h2>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 ${isRTL ? "lg:flex lg:flex-row-reverse" : ""}`}>
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-mosque-green-800">
                {t?.contact?.location || "Our Location"}
              </h3>
              <div className="aspect-video w-full rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.8499582333!2d134.2381123!3d35.5011429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355faa6c3e5d3e8f%3A0x3b8e0c7f8b7b7b7b!2sTottori%20Station!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Masjid Location"
                ></iframe>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-mosque-green-800">
                {t?.contact?.contact || "Contact Info"}
              </h3>
              <div className="space-y-4">
                <div className={`flex items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div className={`mt-1 ${isRTL ? "ml-3" : "mr-3"}`}>
                    <MapPin className="h-5 w-5 text-mosque-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-mosque-green-800">{t?.contact?.address || "Address"}</h4>
                    <p className="text-gray-600">123 Tottori Street, Tottori City</p>
                    <p className="text-gray-600">Tottori Prefecture, Japan 680-0001</p>
                  </div>
                </div>

                <div className={`flex items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div className={`mt-1 ${isRTL ? "ml-3" : "mr-3"}`}>
                    <Phone className="h-5 w-5 text-mosque-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-mosque-green-800">{t?.contact?.phone || "Phone"}</h4>
                    <p className="text-gray-600">+81 123-456-7890</p>
                  </div>
                </div>

                <div className={`flex items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div className={`mt-1 ${isRTL ? "ml-3" : "mr-3"}`}>
                    <Mail className="h-5 w-5 text-mosque-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-mosque-green-800">{t?.contact?.email || "Email"}</h4>
                    <p className="text-gray-600">info@tottorimasjid.jp</p>
                  </div>
                </div>

                <div className={`flex items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div className={`mt-1 ${isRTL ? "ml-3" : "mr-3"}`}>
                    <Clock className="h-5 w-5 text-mosque-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-mosque-green-800">{t?.contact?.hours || "Opening Hours"}</h4>
                    <p className="text-gray-600">{t?.contact?.hoursText || "Open daily for all five prayers"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-mosque-green-800">
              {t?.contact?.formSubject || "Send us a message"}
            </h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t?.contact?.formName || "Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mosque-green-500 focus:border-mosque-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t?.contact?.formEmail || "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mosque-green-500 focus:border-mosque-green-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.contact?.formSubject || "Subject"}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mosque-green-500 focus:border-mosque-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.contact?.formMessage || "Message"}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mosque-green-500 focus:border-mosque-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-mosque-green-700 hover:bg-mosque-green-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {t?.contact?.formSubmit || "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
