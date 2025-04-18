import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/hooks/use-language";
import EventCard from "./event-card";
import { Event } from "@shared/schema";

interface EventsCalendarProps {
  events: Event[];
  className?: string;
}

export default function EventsCalendar({ events, className = "" }: EventsCalendarProps) {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const eventsOnSelectedDate = events.filter(event => {
    if (!selectedDate) return false;
    
    const eventDate = new Date(event.startDateTime);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });
  
  // Get dates that have events for calendar highlighting
  const eventDates = events.map(event => new Date(event.startDateTime));
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{t("events.title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:grid md:grid-cols-7 md:divide-x">
          <div className="p-4 md:col-span-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow-sm p-3"
              modifiers={{
                hasEvent: eventDates
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  borderRadius: '4px',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
          </div>
          
          <div className="p-4 md:col-span-3">
            <h3 className="font-medium mb-3">
              {eventsOnSelectedDate.length > 0 
                ? t("events.upcoming") 
                : t("events.no_events")}
            </h3>
            
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {eventsOnSelectedDate.map(event => (
                  <EventCard key={event.id} event={event} isCompact />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
