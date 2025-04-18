import Hero from "@/components/Hero"
import Header from "@/components/Header"
import PrayerTimes from "@/components/PrayerTimes"
import Events from "@/components/Events"
import About from "@/components/About"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PrayerTimes />
      <Events />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
