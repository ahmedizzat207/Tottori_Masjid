import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import EventCard from "./event-card";
import { Event } from "@shared/schema";

interface EventsCalendarProps {
  events: Event[];
  className?: string;
}

export default function EventsCalendar({ events, className = "" }: EventsCalendarProps) {
  const { t, isRTL } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  
  // Get events for the selected date
  const eventsOnSelectedDate = useMemo(() => events.filter(event => {
    if (!selectedDate) return false;
    
    const eventDate = new Date(event.startDateTime);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  }), [events, selectedDate]);
  
  // Categorize events as upcoming or past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = useMemo(() => 
    events.filter(event => new Date(event.startDateTime) >= today)
          .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()),
    [events]
  );
  
  const pastEvents = useMemo(() => 
    events.filter(event => new Date(event.startDateTime) < today)
          .sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()),
    [events]
  );
  
  // Get dates that have events for calendar highlighting
  const eventDates = events.map(event => new Date(event.startDateTime));
  
  return (
    <Card className={`${className} ${isRTL ? 'rtl-text' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <CardTitle>{t("events.title")}</CardTitle>
          <div className="flex items-center bg-muted rounded-md p-1">
            <Button 
              variant={viewMode === "calendar" ? "default" : "ghost"} 
              size="sm"
              className="h-8"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              {t("calendar")}
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="sm"
              className="h-8"
              onClick={() => setViewMode("list")}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              {t("list")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {viewMode === "calendar" ? (
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">
                  {eventsOnSelectedDate.length > 0 
                    ? t("events.events_for_date", { date: selectedDate?.toLocaleDateString() }) 
                    : t("events.no_events")}
                </h3>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => {
                      if (selectedDate) {
                        const prev = new Date(selectedDate);
                        prev.setDate(prev.getDate() - 1);
                        setSelectedDate(prev);
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => {
                      if (selectedDate) {
                        const next = new Date(selectedDate);
                        next.setDate(next.getDate() + 1);
                        setSelectedDate(next);
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-3">
                  {eventsOnSelectedDate.length > 0 ? (
                    eventsOnSelectedDate.map(event => (
                      <EventCard key={event.id} event={event} isCompact />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                      <p>{t("events.no_events_message")}</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">
                  {t("events.upcoming")} ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  {t("events.past")} ({pastEvents.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-0">
                <ScrollArea className="h-[400px]">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    )) : (
                      <div className="text-center py-8 text-muted-foreground col-span-2">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                        <p>{t("events.no_upcoming_events")}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <ScrollArea className="h-[400px]">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {pastEvents.length > 0 ? pastEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    )) : (
                      <div className="text-center py-8 text-muted-foreground col-span-2">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                        <p>{t("events.no_past_events")}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
