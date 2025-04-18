import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/events/event-card";

export default function UpcomingEvents() {
  const { t } = useLanguage();
  
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  
  // Filter only upcoming events and take first 3
  const upcomingEvents = events
    .filter(event => new Date(event.startDateTime) > new Date())
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
    .slice(0, 3);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-slate-50">
        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[400px]">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">
            {t("home.upcoming_events")}
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Join us for our upcoming events and activities
          </p>
        </div>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 border rounded-lg bg-white">
            <p className="text-muted-foreground">
              {t("events.no_events")}
            </p>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/events" className="inline-flex items-center">
              {t("home.view_all_events")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
