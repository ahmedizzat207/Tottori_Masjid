import { useQuery } from "@tanstack/react-query";
import PrayerTimesDisplay from "@/components/prayer-times/prayer-times-display";
import EnhancedHeroSection from "@/components/home/enhanced-hero-section";
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
      <EnhancedHeroSection />
      
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Daily Prayer Times</h2>
          <div className="max-w-xl mx-auto">
            <PrayerTimesDisplay />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Events Calendar</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventsCalendar events={events} />
          </div>
          <div className="lg:col-span-1">
            <UpcomingEvents />
          </div>
        </div>
      </div>
      
      <ServicesOverview />
    </div>
  );
}
