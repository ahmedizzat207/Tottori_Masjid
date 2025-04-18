import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Event } from "@shared/schema";
import EventCard from "@/components/events/event-card";
import EventsCalendar from "@/components/events/events-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Events() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  
  // Filter upcoming and past events
  const now = new Date();
  
  const upcomingEvents = events
    .filter(event => new Date(event.startDateTime) > now)
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  
  const pastEvents = events
    .filter(event => new Date(event.startDateTime) <= now)
    .sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("events.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("events.subtitle")}
          </p>
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="container mx-auto px-4 py-12">
        <EventsCalendar events={events} className="mb-12" />
        
        <Tabs 
          defaultValue="upcoming" 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="upcoming">{t("events.upcoming")}</TabsTrigger>
            <TabsTrigger value="past">{t("events.past")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px]" />
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border rounded-lg bg-slate-50">
                <p className="text-muted-foreground">
                  {t("events.no_events")}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px]" />
                ))}
              </div>
            ) : pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border rounded-lg bg-slate-50">
                <p className="text-muted-foreground">
                  No past events available.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
