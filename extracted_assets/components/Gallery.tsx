"use client"

import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react"

// Mock gallery images - in a real app, these would come from an API or CMS
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Masjid Interior",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/2868441/pexels-photo-2868441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Prayer Hall",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3823542/pexels-photo-3823542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Masjid Exterior",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2868488/pexels-photo-2868488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Community Event",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/2868441/pexels-photo-2868441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Islamic Calligraphy",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2868441/pexels-photo-2868441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Ramadan Celebration",
  },
]

export default function Gallery() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  return (
    <section id="gallery" className="section-container">
      <div className="container-custom">
        <h2 className="section-title">{t?.gallery?.title || "Photo Gallery"}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(image.id)}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#"
            className="inline-block px-6 py-3 bg-mosque-green-700 hover:bg-mosque-green-800 text-white rounded-md transition-colors shadow-sm"
          >
            {t?.gallery?.viewAll || "View All Photos"}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={GALLERY_IMAGES.find((img) => img.id === selectedImage)?.src || "/placeholder.svg"}
            alt={GALLERY_IMAGES.find((img) => img.id === selectedImage)?.alt}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}
