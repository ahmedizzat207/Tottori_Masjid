import { useQuery } from "@tanstack/react-query";
import EnhancedPrayerDisplay from "@/components/prayer-times/enhanced-prayer-display";
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
      
      <div className="py-16 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Daily Prayer Times</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check accurate prayer times for Tottori Masjid based on geographical location
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <EnhancedPrayerDisplay />
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
