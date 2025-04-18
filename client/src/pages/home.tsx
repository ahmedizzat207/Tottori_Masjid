import { useQuery } from "@tanstack/react-query";
import PrayerTimesDisplay from "@/components/prayer-times/prayer-times-display";
import HeroSection from "@/components/home/hero-section";
import ServicesOverview from "@/components/home/services-overview";
import UpcomingEvents from "@/components/home/upcoming-events";
import { Event } from "@shared/schema";
import EventsCalendar from "@/components/events/events-calendar";

export default function Home() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventsCalendar events={events} />
          </div>
          <div className="lg:col-span-1">
            <PrayerTimesDisplay />
          </div>
        </div>
      </div>
      
      <ServicesOverview />
      <UpcomingEvents />
    </div>
  );
}
