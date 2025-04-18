import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  isCompact?: boolean;
}

export default function EventCard({ event, isCompact = false }: EventCardProps) {
  const { t } = useLanguage();
  const isUpcoming = new Date(event.startDateTime) > new Date();

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {!isCompact && (
        <div className="h-48 bg-muted relative">
          {event.imageUrl ? (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <CalendarIcon className="h-12 w-12 text-primary/40" />
            </div>
          )}
          {isUpcoming && (
            <Badge className="absolute top-3 right-3 bg-primary">
              {t("events.upcoming")}
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader className={isCompact ? "px-4 py-3" : undefined}>
        <div className="flex justify-between items-start">
          <h3 className={`font-medium ${isCompact ? "text-base" : "text-xl"}`}>
            {event.title}
          </h3>
          {isCompact && isUpcoming && (
            <Badge className="ml-2 bg-primary text-xs">
              {t("events.upcoming")}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={`flex-grow ${isCompact ? "px-4 py-1" : undefined}`}>
        {!isCompact && (
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {event.description}
          </p>
        )}
        
        <div className={`space-y-2 ${isCompact ? "text-sm" : undefined}`}>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 text-primary mr-2" />
            <span className="text-muted-foreground">
              {formatDate(event.startDateTime)}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-primary mr-2" />
            <span className="text-muted-foreground">
              {formatTime(event.startDateTime)} - {formatTime(event.endDateTime)}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <span className="text-muted-foreground line-clamp-1">
              {event.location}
            </span>
          </div>
        </div>
      </CardContent>
      
      {!isCompact && (
        <CardFooter className="pt-0">
          <Button asChild className="w-full">
            <Link href={`/events/${event.id}`}>
              {t("home.read_more")}
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
